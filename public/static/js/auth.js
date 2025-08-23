// Firebase Authentication JavaScript統合
// バナスコAI - ログイン・登録機能 (Firebaseクライアント側認証版)

// Firebase CDN Imports (Firebase v9 modular SDK)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

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

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      
      // 認証状態変更の監視
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('ユーザーログイン済み:', user.email);
          currentUser = user;
          
          try {
            // IDトークンを取得してサーバーに送信
            const idToken = await user.getIdToken();
            await this.sendTokenToServer(idToken);
            
            // ダッシュボードにリダイレクト
            if (window.location.pathname === '/login') {
              window.location.href = '/dashboard';
            }
          } catch (error) {
            console.error('IDトークン処理エラー:', error);
          }
        } else {
          console.log('ユーザーログアウト状態');
          currentUser = null;
          
          // ログインページ以外にいる場合はリダイレクト
          if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
            window.location.href = '/login';
          }
        }
        
        isAuthReady = true;
      });
      
      console.log('Firebase Auth 初期化完了');
    } catch (error) {
      console.error('Firebase Auth 初期化エラー:', error);
      this.showError('認証システムの初期化に失敗しました');
    }
  }

  // IDトークンをサーバーに送信
  async sendTokenToServer(idToken) {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken })
      });

      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.status}`);
      }

      const result = await response.json();
      console.log('サーバーセッション作成成功:', result);
      
      return result;
    } catch (error) {
      console.error('サーバーセッション作成エラー:', error);
      throw error;
    }
  }

  // イベントリスナー設定
  setupEventListeners() {
    // ログインフォーム
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // 登録フォーム
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegister();
      });
    }

    // デモログインボタン
    const demoLoginBtn = document.getElementById('demoLoginBtn');
    if (demoLoginBtn) {
      demoLoginBtn.addEventListener('click', () => {
        this.handleDemoLogin();
      });
    }

    // ログアウトボタン
    const logoutBtns = document.querySelectorAll('.logout-btn, #logoutBtn');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleLogout();
      });
    });
  }

  // ログイン処理
  async handleLogin() {
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
      this.showError('メールアドレスとパスワードを入力してください');
      return;
    }

    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = loginBtn?.textContent;
    
    try {
      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.textContent = 'ログイン中...';
      }

      console.log('Firebase login attempt:', { 
        email: email, 
        passwordLength: password.length 
      });

      // Firebaseでユーザー認証
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('Firebase認証成功:', user.email);
      
      // IDトークンを取得
      const idToken = await user.getIdToken();
      console.log('IDトークン取得成功');
      
      // サーバーにIDトークンを送信
      await this.sendTokenToServer(idToken);
      
      this.showSuccess('ログインに成功しました');
      
      // ダッシュボードにリダイレクト（onAuthStateChangedで自動的に実行される）
      
    } catch (error) {
      console.error('ログインエラー:', error);
      
      // Firebase認証エラーの詳細表示
      let errorMessage = 'ログインに失敗しました';
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'メールアドレスまたはパスワードが正しくありません';
          break;
        case 'auth/user-not-found':
          errorMessage = 'このメールアドレスのユーザーは見つかりませんでした';
          break;
        case 'auth/wrong-password':
          errorMessage = 'パスワードが正しくありません';
          break;
        case 'auth/invalid-email':
          errorMessage = 'メールアドレスの形式が正しくありません';
          break;
        case 'auth/user-disabled':
          errorMessage = 'このアカウントは無効化されています';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'ログイン試行回数が多すぎます。しばらく時間をおいて再試行してください';
          break;
        default:
          errorMessage = `ログインエラー: ${error.code}\n${error.message}`;
      }
      
      this.showError(errorMessage);
      
      // アラートでも詳細エラーを表示（デバッグ用）
      alert(`LOGIN ERROR: ${error.code}\nMESSAGE: ${error.message}`);
      
    } finally {
      if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.textContent = originalText;
      }
    }
  }

  // 登録処理
  async handleRegister() {
    const email = document.getElementById('registerEmail')?.value.trim();
    const password = document.getElementById('registerPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    if (!email || !password || !confirmPassword) {
      this.showError('すべての項目を入力してください');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      this.showError('パスワードは6文字以上で入力してください');
      return;
    }

    const registerBtn = document.querySelector('#registerForm button[type="submit"]');
    const originalText = registerBtn?.textContent;
    
    try {
      if (registerBtn) {
        registerBtn.disabled = true;
        registerBtn.textContent = '登録中...';
      }

      console.log('Firebase register attempt:', { 
        email: email, 
        passwordLength: password.length 
      });

      // Firebaseでユーザー作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('Firebase登録成功:', user.email);
      
      // IDトークンを取得
      const idToken = await user.getIdToken();
      console.log('IDトークン取得成功');
      
      // サーバーにIDトークンを送信
      await this.sendTokenToServer(idToken);
      
      this.showSuccess('アカウント登録に成功しました');
      
      // ダッシュボードにリダイレクト（onAuthStateChangedで自動的に実行される）
      
    } catch (error) {
      console.error('登録エラー:', error);
      
      let errorMessage = 'アカウント登録に失敗しました';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'このメールアドレスは既に使用されています';
          break;
        case 'auth/invalid-email':
          errorMessage = 'メールアドレスの形式が正しくありません';
          break;
        case 'auth/weak-password':
          errorMessage = 'パスワードが弱すぎます。より強力なパスワードを設定してください';
          break;
        default:
          errorMessage = `登録エラー: ${error.code}\n${error.message}`;
      }
      
      this.showError(errorMessage);
      
    } finally {
      if (registerBtn) {
        registerBtn.disabled = false;
        registerBtn.textContent = originalText;
      }
    }
  }

  // デモログイン処理
  async handleDemoLogin() {
    const demoEmail = 'demo@banasuko.com';
    const demoPassword = 'demo123456';
    
    // フォームにデモ情報を設定
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput && passwordInput) {
      emailInput.value = demoEmail;
      passwordInput.value = demoPassword;
      
      // ログイン実行
      await this.handleLogin();
    }
  }

  // ログアウト処理
  async handleLogout() {
    try {
      await signOut(auth);
      console.log('ログアウト成功');
      
      // サーバーセッションも削除
      try {
        await fetch('/api/session', {
          method: 'DELETE'
        });
      } catch (error) {
        console.warn('サーバーセッション削除エラー:', error);
      }
      
      this.showSuccess('ログアウトしました');
      
      // ログインページにリダイレクト
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      
    } catch (error) {
      console.error('ログアウトエラー:', error);
      this.showError('ログアウトに失敗しました');
    }
  }

  // エラーメッセージ表示
  showError(message) {
    console.error('Auth Error:', message);
    
    // エラーメッセージ要素があれば表示
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      
      // 5秒後に自動非表示
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 5000);
    }
    
    // アラートでも表示
    alert(message);
  }

  // 成功メッセージ表示
  showSuccess(message) {
    console.log('Auth Success:', message);
    
    // 成功メッセージ要素があれば表示
    const successElement = document.getElementById('successMessage');
    if (successElement) {
      successElement.textContent = message;
      successElement.style.display = 'block';
      
      // 3秒後に自動非表示
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 3000);
    }
  }

  // 現在のユーザーを取得
  getCurrentUser() {
    return currentUser;
  }

  // 認証準備完了かチェック
  isReady() {
    return isAuthReady;
  }
}

// ページ読み込み時に認証マネージャーを初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('認証システム初期化開始');
  window.authManager = new AuthManager();
});

// グローバルに公開
window.AuthManager = AuthManager;