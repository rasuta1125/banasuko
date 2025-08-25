// バナスコAI ユーザーダッシュボード JavaScript
// 使用状況・プラン管理機能

class UserDashboard {
  constructor() {
    this.currentUser = null;
    this.usageStats = null;
    this.selectedPlan = null;
    
    this.init();
  }

  async init() {
    try {
      // 認証状態チェック
      await this.checkAuthState();
      
      if (!this.currentUser) {
        window.location.href = '/login';
        return;
      }

      // イベントリスナー設定
      this.setupEventListeners();
      
      // データ読み込み
      await this.loadDashboardData();
      
      // モバイル用UI調整
      this.adjustMobileUI();
      
      console.log('ダッシュボード初期化完了');
    } catch (error) {
      console.error('ダッシュボード初期化エラー:', error);
      this.showError('ダッシュボードの読み込みに失敗しました');
    }
  }

  // 認証状態チェック
  async checkAuthState() {
    try {
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.currentUser = data.user;
          this.updateUserInfo(data.user);
          return;
        }
      }

      // 認証されていない
      this.currentUser = null;
    } catch (error) {
      console.error('認証状態チェックエラー:', error);
      this.currentUser = null;
    }
  }

  // イベントリスナー設定
  setupEventListeners() {
    // 画像アップロード関連
    this.setupImageUploadListeners();
    
    // プランアップグレードボタン
    document.querySelectorAll('.upgrade-plan-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const plan = e.target.getAttribute('data-plan');
        this.showPlanChangeModal(plan);
      });
    });

    // プラン変更モーダル
    const planModal = document.getElementById('planChangeModal');
    const closePlanModal = document.getElementById('closePlanModal');
    const cancelPlanChange = document.getElementById('cancelPlanChange');
    const confirmPlanChange = document.getElementById('confirmPlanChange');

    if (closePlanModal) {
      closePlanModal.addEventListener('click', () => this.hidePlanChangeModal());
    }

    if (cancelPlanChange) {
      cancelPlanChange.addEventListener('click', () => this.hidePlanChangeModal());
    }

    if (confirmPlanChange) {
      confirmPlanChange.addEventListener('click', () => this.confirmPlanChange());
    }

    // モーダル外クリックで閉じる
    if (planModal) {
      planModal.addEventListener('click', (e) => {
        if (e.target === planModal) {
          this.hidePlanChangeModal();
        }
      });
    }

    // ログアウトボタン
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    }
    document.querySelectorAll('.logout-btn').forEach(btn => {
      btn.addEventListener('click', this.handleLogout.bind(this));
    });
  }

  // ダッシュボードデータ読み込み
  async loadDashboardData() {
    try {
      // 使用統計取得
      await this.loadUsageStats();
      
      // 最近のアクティビティ取得
      await this.loadRecentActivity();
      
    } catch (error) {
      console.error('ダッシュボードデータ読み込みエラー:', error);
    }
  }

  // 使用統計読み込み
  async loadUsageStats() {
    try {
      const response = await fetch('/api/usage/dashboard', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.usageStats = data.data;
          this.updateUsageDisplay(data.data);
        }
      }
    } catch (error) {
      console.error('使用統計読み込みエラー:', error);
    }
  }

  // 最近のアクティビティ読み込み
  async loadRecentActivity() {
    try {
      const response = await fetch('/api/usage/dashboard', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.recentActivity) {
          this.displayRecentActivity(data.data.recentActivity);
        }
      }
    } catch (error) {
      console.error('アクティビティ読み込みエラー:', error);
    }
  }

  // ユーザー情報更新
  updateUserInfo(user) {
    console.log('ユーザー情報を更新中:', user);
    
    // ユーザー名（メールアドレスから生成または実名）
    const displayName = user.displayName || user.name || user.email?.split('@')[0] || 'ユーザー';
    document.querySelectorAll('.user-name').forEach(el => {
      el.textContent = displayName;
    });

    // メールアドレス（実際のメールアドレスを表示）
    document.querySelectorAll('.user-email').forEach(el => {
      el.textContent = user.email || 'メールアドレス不明';
    });

    // プラン名
    document.querySelectorAll('.user-plan').forEach(el => {
      el.textContent = this.getPlanDisplayName(user.plan || 'free');
    });

    // プランに応じたUIの調整
    this.updatePlanUI(user.plan || 'free');
  }

  // 使用状況表示更新
  updateUsageDisplay(data) {
    console.log('使用状況を更新中:', data);
    
    // ユーザー情報の更新
    if (data.user) {
      this.updateUserInfo(data.user);
    }

    // 使用状況の更新
    if (data.usage) {
      const usageMapping = {
        'singleAnalysis': 'single-analysis',
        'abComparison': 'ab-comparison', 
        'copyGeneration': 'copy-generation'
      };

      Object.keys(usageMapping).forEach(apiKey => {
        const usageData = data.usage[apiKey];
        const displayKey = usageMapping[apiKey];
        
        if (usageData) {
          const current = usageData.used || 0;
          const limit = usageData.limit || 0;
          const percentage = limit > 0 ? (current / limit) * 100 : 0;

          // 使用量表示
          const usageEl = document.querySelector(`.usage-${displayKey}`);
          if (usageEl) {
            const limitText = limit === -1 ? '無制限' : limit.toString();
            usageEl.textContent = `${current}/${limitText}`;
          }

          // プログレスバー更新
          const progressElId = this.camelCase(apiKey) + 'Progress';
          const progressEl = document.getElementById(progressElId);
          if (progressEl) {
            progressEl.style.width = `${Math.min(percentage, 100)}%`;
            
              progressEl.className = progressEl.className.replace(/bg-\w+-\w+/, 'bg-red-500');
            } else if (percentage >= 70) {
              progressEl.className = progressEl.className.replace(/bg-\w+-\w+/, 'bg-yellow-500');
            }
          }

          // パーセンテージ表示
          const percentageElId = this.camelCase(apiKey) + 'Percentage';
          const percentageEl = document.getElementById(percentageElId);
          if (percentageEl) {
            percentageEl.textContent = limit === -1 ? '無制限' : `${Math.round(percentage)}%`;
          }
        }
      });
    }

    // リセットまでの日数表示
    if (data.daysUntilReset !== undefined) {
      const daysEl = document.getElementById('daysUntilReset');
      if (daysEl) {
        daysEl.textContent = data.daysUntilReset;
      }
    }
    });

    // リセットまでの日数
    const daysUntilResetEl = document.getElementById('daysUntilReset');
    if (daysUntilResetEl && stats.daysUntilReset) {
      daysUntilResetEl.textContent = stats.daysUntilReset;
    }
  }

  // 最近のアクティビティ表示
  displayRecentActivity(activities) {
    const container = document.getElementById('recentActivity');
    if (!container) return;

    if (activities.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-history text-2xl mb-2"></i>
          <p>アクティビティがありません</p>
        </div>
      `;
      return;
    }

    const activityHTML = activities.slice(0, 5).map(activity => {
      const timeAgo = this.getTimeAgo(activity.timestamp);
      const iconMap = {
        single_analysis: { icon: 'fas fa-chart-line', color: 'cyber-blue' },
        ab_comparison: { icon: 'fas fa-balance-scale', color: 'cyber-green' },
        copy_generation: { icon: 'fas fa-magic', color: 'cyber-pink' }
      };
      
      const actionIcon = iconMap[activity.actionType] || { icon: 'fas fa-cog', color: 'gray-400' };
      
      return `
        <div class="flex items-center p-3 bg-navy-700/30 rounded-lg">
          <div class="w-8 h-8 bg-${actionIcon.color}/20 rounded-lg flex items-center justify-center mr-3">
            <i class="${actionIcon.icon} text-${actionIcon.color} text-sm"></i>
          </div>
          <div class="flex-1">
            <p class="text-white text-sm">${this.getActionDisplayName(activity.actionType)}</p>
            <p class="text-gray-400 text-xs">${timeAgo}</p>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = activityHTML;
  }

  // プラン変更モーダル表示
  showPlanChangeModal(plan) {
    this.selectedPlan = plan;
    
    const modal = document.getElementById('planChangeModal');
    const planNameEl = document.getElementById('newPlanName');
    const planPriceEl = document.getElementById('newPlanPrice');

    const planInfo = {
      basic: { name: 'ベーシックプラン', price: '¥2,980/月' },
      premium: { name: 'プレミアムプラン', price: '¥9,800/月' }
    };

    if (planNameEl) planNameEl.textContent = planInfo[plan].name;
    if (planPriceEl) planPriceEl.textContent = planInfo[plan].price;

    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  // プラン変更モーダル非表示
  hidePlanChangeModal() {
    const modal = document.getElementById('planChangeModal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.selectedPlan = null;
  }

  // プラン変更確定
  async confirmPlanChange() {
    if (!this.selectedPlan) return;

    try {
      const response = await fetch('/api/user/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPlan: this.selectedPlan
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        this.showSuccess('プランが変更されました！');
        this.hidePlanChangeModal();
        
        // ユーザー情報とダッシュボードを更新
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        this.showError(data.error || 'プラン変更に失敗しました');
      }
    } catch (error) {
      console.error('プラン変更エラー:', error);
      this.showError('ネットワークエラーが発生しました');
    }
  }

  // ログアウト処理
  async handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        this.showSuccess('ログアウトしました');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        this.showError('ログアウトに失敗しました');
      }
    } catch (error) {
      console.error('ログアウトエラー:', error);
      this.showError('ネットワークエラーが発生しました');
    }
  }

  // プランUIの更新
  updatePlanUI(userPlan) {
    // 現在のプランのボタンを無効化
    document.querySelectorAll('.upgrade-plan-btn').forEach(btn => {
      const btnPlan = btn.getAttribute('data-plan');
      if (btnPlan === userPlan) {
        btn.textContent = '現在のプラン';
        btn.className = 'w-full bg-gray-600 text-gray-400 py-2 rounded-lg cursor-not-allowed';
        btn.disabled = true;
      }
    });
  }

  // ユーティリティ関数
  getPlanDisplayName(plan) {
    const planNames = {
      free: 'フリープラン',
      basic: 'ベーシックプラン', 
      premium: 'プレミアムプラン'
    };
    return planNames[plan] || plan;
  }

  getActionDisplayName(actionType) {
    const actionNames = {
      single_analysis: 'AI広告診断を実行',
      ab_comparison: 'A/B比較分析を実行',
      copy_generation: 'AIコピー生成を実行'
    };
    return actionNames[actionType] || actionType;
  }

  camelCase(str) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp.seconds * 1000);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '1分前';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 30) return `${diffDays}日前`;
    
    return time.toLocaleDateString();
  }

  // メッセージ表示
  showSuccess(message) {
    this.showToast(message, 'success');
  }

  showError(message) {
    this.showToast(message, 'error');
  }

  showToast(message, type = 'info') {
    // 簡単なトースト表示
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // アニメーション
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // 自動削除
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // 画像アップロード機能設定
  setupImageUploadListeners() {
    // アップロードカードクリック
    const uploadImageCard = document.getElementById('uploadImageCard');
    if (uploadImageCard) {
      uploadImageCard.addEventListener('click', () => this.showUploadModal());
    }

    // アップロードモーダル関連
    const uploadModal = document.getElementById('uploadModal');
    const closeUploadModal = document.getElementById('closeUploadModal');
    const imageInput = document.getElementById('imageInput');
    const selectImageBtn = document.getElementById('selectImageBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');

    if (closeUploadModal) {
      closeUploadModal.addEventListener('click', () => this.hideUploadModal());
    }

    if (selectImageBtn) {
      selectImageBtn.addEventListener('click', () => imageInput?.click());
    }

    if (imageInput) {
      imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleImageUpload(e.target.files[0]);
        }
      });
    }

    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => this.startAnalysis());
    }

    if (cancelUploadBtn) {
      cancelUploadBtn.addEventListener('click', () => this.resetUploadModal());
    }

    // ドラッグ&ドロップ
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-cyber-blue');
      });

      uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-cyber-blue');
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-cyber-blue');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleImageUpload(files[0]);
        }
      });
    }

    // カメラ機能 (Mobile Upload Fix - Issue #4)
    const cameraCard = document.getElementById('cameraCard');
    if (cameraCard) {
      // モバイルでカメラ強制起動を防ぐ
      cameraCard.addEventListener('click', () => {
        if (this.isMobile()) {
          // モバイルでもファイル選択ダイアログを表示
          imageInput?.click();
        } else {
          this.showCameraModal();
        }
      });
    }
  }

  // モバイル判定
  isMobile() {
    // より確実なモバイル判定
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768) ||
           (typeof window.orientation !== 'undefined');
  }

  // アップロードモーダル表示
  showUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  // アップロードモーダル非表示
  hideUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.resetUploadModal();
  }

  // アップロードモーダルリセット
  resetUploadModal() {
    const uploadArea = document.getElementById('uploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const imageInput = document.getElementById('imageInput');

    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (previewImage) previewImage.src = '';
    if (imageInput) imageInput.value = '';
  }

  // 画像アップロード処理
  handleImageUpload(file) {
    // ファイル検証
    if (!this.validateImageFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadArea = document.getElementById('uploadArea');
      const uploadPreview = document.getElementById('uploadPreview');
      const previewImage = document.getElementById('previewImage');

      if (uploadArea) uploadArea.style.display = 'none';
      if (uploadPreview) uploadPreview.style.display = 'block';
      if (previewImage) previewImage.src = e.target.result;

      // 画像データを保存
      this.currentImageData = e.target.result;
      
      console.log('画像アップロード完了:', file.name);
    };
    reader.readAsDataURL(file);
  }

  // 画像ファイル検証
  validateImageFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      this.showError('PNG, JPG, JPEG, WEBP形式のファイルをアップロードしてください');
      return false;
    }

    if (file.size > maxSize) {
      this.showError('ファイルサイズは10MB以下にしてください');
      return false;
    }

    return true;
  }

  // 分析開始
  async startAnalysis() {
    if (!this.currentImageData) {
      this.showError('画像をアップロードしてください');
      return;
    }

    const analyzeBtn = document.getElementById('analyzeBtn');
    
    try {
      // ボタン無効化
      if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '分析中...';
      }

      console.log('🔍 画像分析開始');

      // デフォルトでInstagram投稿として分析
      const response = await fetch('/api/analysis/single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          image: this.currentImageData,
          platform: 'instagram-post',
          adType: null
        })
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (result.success) {
        this.displayAnalysisResult(result.result);
        this.showSuccess('分析が完了しました！');
        this.hideUploadModal();
      } else {
        throw new Error(result.message || '分析に失敗しました');
      }

    } catch (error) {
      console.error('分析エラー:', error);
      this.showError(error.message || '分析中にエラーが発生しました。もう一度試してください。');
    } finally {
      // ボタン復元
      if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '分析開始';
      }
    }
  }

  // 分析結果表示
  displayAnalysisResult(result) {
    // 最近の分析結果リストを更新
    const recentAnalysisList = document.getElementById('recentAnalysisList');
    if (recentAnalysisList) {
      // 空状態を削除
      const emptyState = recentAnalysisList.querySelector('.empty-state');
      if (emptyState) {
        emptyState.remove();
      }

      // 新しい結果を追加
      const resultHTML = `
        <div class="analysis-item bg-navy-700/30 rounded-lg p-4 mb-4 border border-cyber-blue/20">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-semibold">画像分析結果</h3>
            <span class="text-xs text-gray-400">${new Date().toLocaleString()}</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-2xl font-bold ${result.score ? 'text-cyber-blue' : 'text-cyber-green'}">
              ${result.score ? `${result.score}点` : `${result.grade}評価`}
            </div>
            <div class="text-sm text-gray-300">
              媒体: ${this.getPlatformName(result.platform)}
            </div>
          </div>
          <div class="mt-2 text-sm text-gray-300 line-clamp-2">
            ${result.analysis.substring(0, 100)}...
          </div>
          ${result.improvements && result.improvements.length > 0 ? `
            <div class="mt-2">
              <span class="text-xs text-cyber-orange">改善提案: ${result.improvements.length}件</span>
            </div>
          ` : ''}
        </div>
      `;
      
      recentAnalysisList.insertAdjacentHTML('afterbegin', resultHTML);
    }

    // 統計情報を更新
    this.updateAnalysisStats();
  }

  // 統計情報更新
  updateAnalysisStats() {
    const totalAnalyses = document.getElementById('totalAnalyses');
    const monthlyAnalyses = document.getElementById('monthlyAnalyses');
    
    if (totalAnalyses) {
      const current = parseInt(totalAnalyses.textContent) || 0;
      totalAnalyses.textContent = current + 1;
    }
    
    if (monthlyAnalyses) {
      const current = parseInt(monthlyAnalyses.textContent) || 0;
      monthlyAnalyses.textContent = current + 1;
    }
  }

  // プラットフォーム名取得
  getPlatformName(platform) {
    const names = {
      'instagram-post': 'Instagram投稿',
      'instagram-ad': 'Instagram広告', 
      'gdn': 'GDN広告',
      'yahoo': 'Yahoo広告'
    };
    return names[platform] || platform;
  }

  // カメラモーダル表示 (Desktop only)
  showCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
      modal.style.display = 'flex';
      this.initCamera();
    }
  }

  // カメラ初期化
  async initCamera() {
    const video = document.getElementById('cameraVideo');
    if (!video) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (error) {
      console.error('カメラアクセスエラー:', error);
      this.showError('カメラにアクセスできませんでした');
    }
  }

  // モバイルUI調整
  adjustMobileUI() {
    if (this.isMobile()) {
      // カメラカードを確実に非表示
      const cameraCard = document.getElementById('cameraCard');
      if (cameraCard) {
        cameraCard.style.display = 'none';
      }

      // グリッドレイアウトを2列に調整
      const actionCards = document.querySelector('.action-cards');
      if (actionCards) {
        actionCards.classList.add('grid-cols-1', 'sm:grid-cols-2');
        actionCards.classList.remove('grid-cols-3');
      }

      console.log('📱 モバイルUI調整完了');
    }
  }
}

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('ユーザーダッシュボード初期化開始');
  window.userDashboard = new UserDashboard();
});