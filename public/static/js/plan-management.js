/**
 * Plan Management JavaScript (Cookie-auth unified)
 * - Cookieベースの認証に統一（fetch は必ず credentials: 'include'）
 * - 有料プランは /api/billing/checkout でStripe Checkoutへ
 * - 無料(=free)へのダウングレードは /api/user/plan に直接POST
 */

class PlanManagement {
  constructor() {
    this.planCards = null;

    // Modals
    this.confirmModal = null;
    this.successModal = null;

    // Modal elements
    this.confirmPlanName = null;
    this.confirmPlanPrice = null;
    this.confirmButton = null;
    this.cancelButton = null;
    this.closeModalButtons = null;

    // State
    this.loadingStates = new Map();
    this.selectedPlan = null;
    this.currentPlan = null;

    document.addEventListener('DOMContentLoaded', () => {
      this.initializeElements();
      this.bindEvents();
      this.loadUserPlan();
    });
  }

  initializeElements() {
    this.planCards = document.querySelectorAll('.plan-card');

    this.confirmModal = document.getElementById('confirmModal');
    this.successModal = document.getElementById('successModal');

    this.confirmPlanName = document.getElementById('confirmPlanName');
    this.confirmPlanPrice = document.getElementById('confirmPlanPrice');
    this.confirmButton = document.getElementById('confirmButton');
    this.cancelButton = document.getElementById('cancelButton');
    this.closeModalButtons = document.querySelectorAll('.close-modal');
  }

  bindEvents() {
    // Select buttons
    document.querySelectorAll('.select-plan-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const planType = btn.dataset.plan;
        this.selectPlan(planType);
      });
    });

    // Confirm / Cancel
    if (this.confirmButton) {
      this.confirmButton.addEventListener('click', () => this.confirmPlanChange());
    }
    if (this.cancelButton) {
      this.cancelButton.addEventListener('click', () => this.closeModal());
    }

    // Close all modals
    this.closeModalButtons.forEach((btn) => {
      btn.addEventListener('click', () => this.closeModal());
    });

    // Backdrop click to close
    [this.confirmModal, this.successModal].forEach((modal) => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    });

    // FAQ toggle (optional,既存DOMがあれば有効)
    document.querySelectorAll('.faq-question').forEach((q) => {
      q.addEventListener('click', () => {
        const ans = q.nextElementSibling;
        const open = ans?.style.display === 'block';
        document.querySelectorAll('.faq-answer').forEach((a) => (a.style.display = 'none'));
        if (ans) ans.style.display = open ? 'none' : 'block';
      });
    });
  }

  async loadUserPlan() {
    try {
      // Cookie認証: credentials: 'include' を必須
      const res = await fetch('/api/user/profile', { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json();

      // 想定レスポンス：{ plan: 'free'| 'basic' | 'premium', ... }
      const plan = data?.plan || data?.user?.plan || 'free';
      this.currentPlan = plan;
      this.updateCurrentPlanDisplay(plan);
    } catch (err) {
      console.error('Error loading user plan:', err);
    }
  }

  updateCurrentPlanDisplay(currentPlan) {
    this.planCards.forEach((card) => {
      const planType = card.dataset.plan;
      const btn = card.querySelector('.select-plan-btn');

      if (planType === currentPlan) {
        card.classList.add('current-plan');
        if (btn) {
          btn.textContent = '現在のプラン';
          btn.disabled = true;
          btn.classList.add('current');
        }
      } else {
        card.classList.remove('current-plan');
        if (btn) {
          btn.textContent = 'このプランを選択';
          btn.disabled = false;
          btn.classList.remove('current');
        }
      }
    });
  }

  selectPlan(planType) {
    const details = this.getPlanDetails(planType);
    if (!details) {
      console.error('Invalid plan type:', planType);
      return;
    }

    this.selectedPlan = { type: planType, ...details };
    if (this.confirmPlanName) this.confirmPlanName.textContent = details.name;
    if (this.confirmPlanPrice) this.confirmPlanPrice.textContent = details.price;

    this.showModal(this.confirmModal);
  }

  getPlanDetails(planType) {
    const plans = {
      free: {
        name: 'フリープラン',
        price: '無料',
        paid: false,
        features: ['月10回まで画像解析', '基本的なAIコピー生成', 'コミュニティサポート'],
      },
      basic: {
        name: 'ベーシックプラン',
        price: '¥2,980/月',
        paid: true,
        features: ['月100回まで画像解析', '高品質AIコピー生成', 'A/B比較分析', 'メールサポート'],
      },
      premium: {
        name: 'プレミアムプラン',
        price: '¥9,800/月',
        paid: true,
        features: ['無制限画像解析', 'プレミアムAI機能', '詳細分析レポート', '優先サポート', 'APIアクセス'],
      },
    };
    return plans[planType] || null;
  }

  async confirmPlanChange() {
    if (!this.selectedPlan) return;

    // ローディング
    this.setLoading(this.confirmButton, true);

    try {
      const target = this.selectedPlan.type;

      // 1) 無料へ変更（ダウングレード/解約相当）→ 直接更新API
      if (target === 'free') {
        const res = await fetch('/api/user/plan', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: 'free' }),
        });

        const result = await res.json();
        if (!res.ok || !result?.success) {
          throw new Error(result?.error || 'プラン変更に失敗しました');
        }

        this.updateCurrentPlanDisplay('free');
        this.closeModal();
        this.showSuccessModal();
        setTimeout(() => window.location.reload(), 800);
        return;
      }

      // 2) 有料プラン → Checkout セッションを作成して遷移
      const sessionRes = await fetch('/api/billing/checkout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: target }), // サーバ側で priceId を引き当て
      });

      const sessionData = await sessionRes.json();
      if (!sessionRes.ok || !sessionData?.url) {
        throw new Error(sessionData?.error || '決済セッションの作成に失敗しました');
      }

      // Stripe の Checkout へ
      window.location.href = sessionData.url;
    } catch (error) {
      console.error('Error changing plan:', error);
      alert(`エラー: ${error.message}`);
    } finally {
      this.setLoading(this.confirmButton, false);
    }
  }

  // Helpers
  showModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    [this.confirmModal, this.successModal].forEach((m) => {
      if (m) m.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    this.selectedPlan = null;
  }

  showSuccessModal() {
    this.showModal(this.successModal);
    setTimeout(() => this.closeModal(), 2500);
  }

  setLoading(element, isLoading) {
    if (!element) return;
    if (isLoading) {
      this.loadingStates.set(element, element.textContent);
      element.textContent = '処理中...';
      element.disabled = true;
    } else {
      const original = this.loadingStates.get(element);
      if (original) {
        element.textContent = original;
        this.loadingStates.delete(element);
      }
      element.disabled = false;
    }
  }
}

// Auto-init when this script is included on the plan page
window.PlanManagement = PlanManagement;
new PlanManagement();
