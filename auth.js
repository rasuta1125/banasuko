// 🚫 このファイルはバナスコ安定UIの最終版です。UI改変・テンプレ置換は禁止です
// Firebase Authentication JavaScript統合 - STABLE VERSION
// バナスコAI - ログイン・登録機能

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyAflp1vqSA21sSYihZDTpje-MB1mCALxBs",
  authDomain: "banasuko-auth.firebaseapp.com",
  projectId: "banasuko-auth",
  storageBucket: "banasuko-auth.firebasestorage.app",
  messagingSenderId: "753581941845",
  appId: "1:753581941845:web:18418afb254c309933e0dc",
  measurementId: "G-09515RW8KC"
};

// グローバル変数
let currentUser = null;
let isAuthReady = false;

// 認証状態管理
class AuthManager {
  constructor() {
    this.initializeAuth();
    this.setupEventListeners();
  }

  // Firebase初期化
  async initializeAuth() {
    try {
      console.log('Firebase Auth 初期化中...');
      isAuthReady = true;
      // ページ読み込み時に認証状態をチェック
      await this.checkAuthState();
      console.log('Firebase Auth 初期化完了');
    } catch (error) {
      console.error('Firebase Auth 初期化エラー:', error);
      this.showError('認証システムの初期化に失敗しました');
    }
  }

  // 認証状態チェック
  async checkAuthState() {
    try {
      // クッキーからトークンを取得
      const token = this.getCookie('auth-token');
      if (token) {
        // トークンが存在する場合、ユーザー情報を取得
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            currentUser = data.user;
            this.onAuthStateChanged(data.user);
            return;
          }
        }
      }
      // 認証されていない状態
      this.onAuthStateChanged(null);
    } catch (error) {
      console.error('認証状態チェックエラー:', error);
      this.onAuthStateChanged(null);
    }
  }

  // 認証状態変更時の処理
  onAuthStateChanged(user) {
    currentUser = user;
    if (user) {
      console.log('ユーザーがログインしています:', user.username);
      // ログイン後のリダイレクト
      if (window.location.pathname === '/login') {
        window.location.href = '/analysis';
      }
      this.updateUserInfo(user);
    } else {
      console.log('ユーザーはログインしていません');
      // 認証が必要なページからログインページにリダイレクト
      const protectedPages = ['/analysis', '/copy-generation', '/admin'];
      if (protectedPages.includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }
  }

  // イベントリスナー設定
  setupEventListeners() {
    // ログインフォーム
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }

    // 登録フォーム
    const registerForm = document.getElementById('registerFormElement');
    if (registerForm) {
      registerForm.addEventListener('submit', this.handleRegister.bind(this));
    }

    // デモログインボタン
    const demoLoginBtn = document.getElementById('demoLoginButton');
    if (demoLoginBtn) {
      demoLoginBtn.addEventListener('click', this.handleDemoLogin.bind(this));
    }

    // フォーム切り替え
    const showRegisterBtn = document.getElementById('showRegisterForm');
    const showLoginBtn = document.getElementById('showLoginForm');
    const loginFormDiv = document.querySelector('.bg-navy-800\\/50:first-child');
    const registerFormDiv = document.getElementById('registerForm');

    if (showRegisterBtn && registerFormDiv) {
      showRegisterBtn.addEventListener('click', () => {
        loginFormDiv.style.display = 'none';
        registerFormDiv.classList.remove('hidden');
      });
    }

    if (showLoginBtn && loginFormDiv) {
      showLoginBtn.addEventListener('click', () => {
        registerFormDiv.classList.add('hidden');
        loginFormDiv.style.display = 'block';
      });
    }

    // ログアウトボタン（全ページ共通）
    document.addEventListener('click', (e) => {
      if (e.target.matches('.logout-btn, .logout-btn *')) {
        e.preventDefault();
        this.handleLogout();
      }
    });
  }

  // ログイン処理
  async handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // デモアカウントかどうかを判定
    const isDemo = email === 'demo@banasuko.com' && password === 'demo123';

    const loginData = {
      email: email,
      password: password,
      username: isDemo ? 'demo' : email.split('@')[0] // デモログイン用またはemail prefix
    };

    this.setLoading(true, 'login');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        this.showSuccess('ログインしました！');
        currentUser = data.user;
        // ページリダイレクト
        setTimeout(() => {
          window.location.href = '/analysis';
        }, 1000);
      } else {
        this.showError(data.error || 'ログインに失敗しました');
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      this.showError('ネットワークエラーが発生しました');
    } finally {
      this.setLoading(false, 'login');
    }
  }

  // ユーザー登録処理
  async handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registerData = {
      email: formData.get('email'),
      password: formData.get('password'),
      username: formData.get('username'),
      displayName: formData.get('username') // usernameを表示名としても使用
    };

    // バリデーション
    if (!registerData.email || !registerData.password || !registerData.username) {
      this.showError('すべての項目を入力してください', 'register');
      return;
    }
    if (registerData.password.length < 6) {
      this.showError('パスワードは6文字以上で入力してください', 'register');
      return;
    }

    this.setLoading(true, 'register');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        this.showSuccess('アカウントが作成されました！', 'register');
        currentUser = data.user;
        // ページリダイレクト
        setTimeout(() => {
          window.location.href = '/analysis';
        }, 1500);
      } else {
        this.showError(data.error || 'アカウント作成に失敗しました', 'register');
      }
    } catch (error) {
      console.error('登録エラー:', error);
      this.showError('ネットワークエラーが発生しました', 'register');
    } finally {
      this.setLoading(false, 'register');
    }
  }

  // デモログイン処理
  async handleDemoLogin(event) {
    event.preventDefault();
    // デモアカウント情報をフォームに自動入力
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    if (emailField && passwordField) {
      emailField.value = 'demo@banasuko.com';
      passwordField.value = 'demo123';
      // 通常のログイン処理を実行
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        this.handleLogin({ preventDefault: () => {}, target: loginForm });
        return;
      }
    }

    // フォールバック: 直接デモログインAPI呼び出し
    this.setLoading(true, 'demo');

    try {
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        this.showSuccess('デモログインしました！');
        currentUser = data.user;
        // ページリダイレクト
        setTimeout(() => {
          window.location.href = '/analysis';
        }, 1000);
      } else {
        this.showError(data.error || 'デモログインに失敗しました');
      }
    } catch (error) {
      console.error('デモログインエラー:', error);
      this.showError('ネットワークエラーが発生しました');
    } finally {
      this.setLoading(false, 'demo');
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
        currentUser = null;
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

  // ユーザー情報更新
  updateUserInfo(user) {
    // ヘッダーのユーザー情報を更新
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    const userPlanElements = document.querySelectorAll('.user-plan');

    userNameElements.forEach(el => {
      el.textContent = user.displayName || user.username;
    });
    userEmailElements.forEach(el => {
      el.textContent = user.email;
    });
    userPlanElements.forEach(el => {
      el.textContent = this.getPlanDisplayName(user.plan);
    });

    // 使用状況の更新
    this.updateUsageInfo(user);
  }

  // 使用状況更新
  async updateUsageInfo(user) {
    try {
      const response = await fetch('/api/usage/dashboard', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.displayUsageStats(data.data);
        }
      }
    } catch (error) {
      console.error('使用状況取得エラー:', error);
    }
  }

  // 使用統計表示
  displayUsageStats(stats) {
    const usageElements = {
      singleAnalysis: document.querySelector('.usage-single-analysis'),
      abComparison: document.querySelector('.usage-ab-comparison'),
      copyGeneration: document.querySelector('.usage-copy-generation')
    };
    if (usageElements.singleAnalysis) {
      usageElements.singleAnalysis.textContent = `${stats.currentUsage.single_analysis}/${stats.limits.single_analysis === -1 ? '無制限' : stats.limits.single_analysis}`;
    }
    if (usageElements.abComparison) {
      usageElements.abComparison.textContent = `${stats.currentUsage.ab_comparison}/${stats.limits.ab_comparison === -1 ? '無制限' : stats.limits.ab_comparison}`;
    }
    if (usageElements.copyGeneration) {
      usageElements.copyGeneration.textContent = `${stats.currentUsage.copy_generation}/${stats.limits.copy_generation === -1 ? '無制限' : stats.limits.copy_generation}`;
    }
  }

  // プラン表示名取得
  getPlanDisplayName(plan) {
    const planNames = {
      free: 'フリープラン',
      basic: 'ベーシックプラン',
      premium: 'プレミアムプラン'
    };
    return planNames[plan] || plan;
  }

  // ローディング状態設定
  setLoading(isLoading, type = 'login') {
    const loadingElements = {
      login: {
        button: document.getElementById('loginButton'),
        text: document.getElementById('loginButtonText'),
        spinner: document.getElementById('loginSpinner')
      },
      register: {
        button: document.getElementById('registerButton'),
        text: document.getElementById('registerButtonText'),
        spinner: document.getElementById('registerSpinner')
      },
      demo: {
        button: document.getElementById('demoLoginButton')
      }
    };
    const elements = loadingElements[type];
    if (!elements) return;

    if (elements.button) {
      elements.button.disabled = isLoading;
    }
    if (elements.text && elements.spinner) {
      if (isLoading) {
        elements.text.classList.add('hidden');
        elements.spinner.classList.remove('hidden');
      } else {
        elements.text.classList.remove('hidden');
        elements.spinner.classList.add('hidden');
      }
    }
    if (type === 'demo' && elements.button) {
      elements.button.innerHTML = isLoading ? 'デモログイン中...' : 'デモアカウントでログイン';
    }
  }

  // エラーメッセージ表示
  showError(message, type = 'login') {
    const errorElements = {
      login: {
        container: document.getElementById('errorMessage'),
        text: document.getElementById('errorText')
      },
      register: {
        container: document.getElementById('regErrorMessage'),
        text: document.getElementById('regErrorText')
      }
    };
    const elements = errorElements[type];
    if (elements && elements.container && elements.text) {
      elements.text.textContent = message;
      elements.container.classList.remove('hidden');
      // 5秒後に自動で非表示
      setTimeout(() => {
        elements.container.classList.add('hidden');
      }, 5000);
    } else {
      // フォールバック: アラート表示
      alert('エラー: ' + message);
    }
  }

  // 成功メッセージ表示
  showSuccess(message, type = 'login') {
    const successElements = {
      login: {
        container: document.getElementById('successMessage'),
        text: document.getElementById('successText')
      },
      register: {
        container: document.getElementById('regSuccessMessage'),
        text: document.getElementById('regSuccessText')
      }
    };
    const elements = successElements[type];
    if (elements && elements.container && elements.text) {
      elements.text.textContent = message;
      elements.container.classList.remove('hidden');
    } else {
      // フォールバック: アラート表示
      alert('成功: ' + message);
    }
  }

  // クッキー取得
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // 現在のユーザー取得
  getCurrentUser() {
    return currentUser;
  }

  // 認証状態確認
  isAuthenticated() {
    return currentUser !== null;
  }
}

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('バナスコAI 認証システム初期化開始');
  window.authManager = new AuthManager();
});

// グローバル関数として公開
window.getCurrentUser = () => window.authManager?.getCurrentUser();
window.isAuthenticated = () => window.authManager?.isAuthenticated();