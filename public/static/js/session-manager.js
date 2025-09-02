// バナスコAI - 統一セッション管理システム（Cookie認証統一版）
// 全ページでログイン情報を共有

class SessionManager {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.sessionCheckPromise = null;
    
    this.init();
  }

  async init() {
    console.log('🔄 セッション管理システム初期化（Cookie認証統一版）');
    
    // セッション状態をチェック
    await this.checkSession();
    
    // 定期的にセッション状態を更新
    setInterval(() => {
      this.checkSession();
    }, 30000); // 30秒ごとにチェック
  }

  // セッション状態チェック
  async checkSession() {
    // 既にチェック中の場合は待機
    if (this.sessionCheckPromise) {
      return this.sessionCheckPromise;
    }

    this.sessionCheckPromise = this._performSessionCheck();
    const result = await this.sessionCheckPromise;
    this.sessionCheckPromise = null;
    return result;
  }

  // 実際のセッションチェック処理
  async _performSessionCheck() {
    try {
      // Cookie認証統一: credentials: 'include' を必須
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          this.currentUser = data.user;
          this.isAuthenticated = true;
          this._notifySessionChange('login', data.user);
          return { authenticated: true, user: data.user };
        }
      }

      // 認証されていない
      if (this.isAuthenticated) {
        this.currentUser = null;
        this.isAuthenticated = false;
        this._notifySessionChange('logout');
      }

      return { authenticated: false, user: null };

    } catch (error) {
      console.error('セッションチェックエラー:', error);
      return { authenticated: false, user: null };
    }
  }

  // ログイン処理
  async login(email, password) {
    try {
      console.log('🔐 ログイン処理開始:', email);

      // Cookie認証統一: credentials: 'include' を必須
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        this.currentUser = data.user;
        this.isAuthenticated = true;
        this._notifySessionChange('login', data.user);
        
        console.log('✅ ログイン成功:', data.user.email);
        return { success: true, user: data.user };
      } else {
        console.error('❌ ログイン失敗:', data.error);
        return { success: false, error: data.error };
      }

    } catch (error) {
      console.error('💥 ログインエラー:', error);
      return { success: false, error: 'ネットワークエラーが発生しました' };
    }
  }

  // 新規登録処理
  async register(email, password) {
    try {
      console.log('📝 新規登録処理開始:', email);

      // Cookie認証統一: credentials: 'include' を必須
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        this.currentUser = data.user;
        this.isAuthenticated = true;
        this._notifySessionChange('register', data.user);
        
        console.log('✅ 新規登録成功:', data.user.email);
        return { success: true, user: data.user };
      } else {
        console.error('❌ 新規登録失敗:', data.error);
        return { success: false, error: data.error };
      }

    } catch (error) {
      console.error('💥 新規登録エラー:', error);
      return { success: false, error: 'ネットワークエラーが発生しました' };
    }
  }

  // ログアウト処理
  async logout() {
    try {
      console.log('🚪 ログアウト処理開始');

      // Cookie認証統一: credentials: 'include' を必須
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      this.currentUser = null;
      this.isAuthenticated = false;
      this._notifySessionChange('logout');
      
      console.log('✅ ログアウト成功');
      return { success: true };

    } catch (error) {
      console.error('💥 ログアウトエラー:', error);
      // エラーでもローカル状態はクリア
      this.currentUser = null;
      this.isAuthenticated = false;
      this._notifySessionChange('logout');
      return { success: true };
    }
  }

  // 現在のユーザー情報を取得
  getCurrentUser() {
    return this.currentUser;
  }

  // 認証状態を取得
  isLoggedIn() {
    return this.isAuthenticated;
  }

  // セッション変更通知
  _notifySessionChange(type, user = null) {
    // カスタムイベントを発火
    const event = new CustomEvent('sessionChange', {
      detail: {
        type: type, // 'login', 'logout', 'register'
        user: user,
        authenticated: this.isAuthenticated
      }
    });
    
    window.dispatchEvent(event);
    console.log('📢 セッション変更通知:', type, user?.email);
  }

  // ページ保護（認証が必要なページ用）
  requireAuth(redirectUrl = '/login') {
    if (!this.isAuthenticated) {
      console.log('🔒 認証が必要です。リダイレクト:', redirectUrl);
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }

  // 認証済みユーザーのみアクセス可能なページ用
  redirectIfAuthenticated(targetUrl = '/dashboard') {
    if (this.isAuthenticated) {
      console.log('🔄 既にログイン済みです。リダイレクト:', targetUrl);
      window.location.href = targetUrl;
      return true;
    }
    return false;
  }
}

// グローバルセッション管理インスタンス
window.sessionManager = new SessionManager();

// ページ読み込み時の自動処理
document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 ページ読み込み完了 - セッション管理開始（Cookie認証統一版）');
  
  // 現在のページに応じた処理
  const currentPath = window.location.pathname;
  
  if (currentPath === '/login') {
    // ログインページ: 既にログイン済みならダッシュボードにリダイレクト
    window.sessionManager.redirectIfAuthenticated('/dashboard');
  } else if (currentPath === '/dashboard') {
    // ダッシュボード: 認証が必要
    window.sessionManager.requireAuth('/login');
  }
  
  // セッション変更イベントのリスナー
  window.addEventListener('sessionChange', (event) => {
    const { type, user, authenticated } = event.detail;
    
    console.log('📢 セッション変更イベント受信:', type);
    
    // ページ固有の処理
    if (type === 'login' || type === 'register') {
      // ログイン成功時の処理
      if (currentPath === '/login') {
        window.location.href = '/dashboard';
      }
    } else if (type === 'logout') {
      // ログアウト時の処理
      if (currentPath !== '/login' && currentPath !== '/') {
        window.location.href = '/login';
      }
    }
  });
});

// グローバルに公開
window.SessionManager = SessionManager;
