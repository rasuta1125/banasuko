// バナスコAI - シンプルで確実なログイン機能
// 初代バナスコのバックエンドAPIを使用

// ローディング状態管理
function setLoading(isLoading) {
  const loginBtn = document.getElementById('loginButton');
  const loginBtnText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');
  
  if (loginBtn) {
    loginBtn.disabled = isLoading;
  }
  
  if (loginBtnText) {
    loginBtnText.textContent = isLoading ? 'ログイン中...' : 'ログイン';
  }
  
  if (loginSpinner) {
    loginSpinner.style.display = isLoading ? 'inline-block' : 'none';
  }
}

// メッセージ表示管理
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  
  if (errorMessage && errorText) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
  }
  
  console.error('Login Error:', message);
}

function showSuccess(message) {
  const successMessage = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  
  if (successMessage && successText) {
    successText.textContent = message;
    successMessage.classList.remove('hidden');
  }
  
  console.log('Login Success:', message);
}

function hideMessages() {
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');
  
  if (errorMessage) {
    errorMessage.classList.add('hidden');
  }
  
  if (successMessage) {
    successMessage.classList.add('hidden');
  }
}

// フォーム送信処理（初代バナスコのAPIエンドポイントを使用）
document.addEventListener('DOMContentLoaded', function() {
  console.log('バナスコAI ログインシステム初期化');
  
  const loginForm = document.getElementById('loginForm');
  const demoLoginBtn = document.getElementById('demoLoginBtn');
  
  // ログインフォーム送信処理
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // ローディング状態
      setLoading(true);
      hideMessages();
      
      try {
        // 初代バナスコのAPIエンドポイントを使用
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
          showSuccess('ログインに成功しました！ダッシュボードにリダイレクトします...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          showError(data.error || 'ログインに失敗しました');
        }
      } catch (error) {
        showError('ネットワークエラーが発生しました');
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    });
  }
  
  // デモログインボタン処理
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      // デモアカウント情報を自動入力
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      
      if (emailInput && passwordInput) {
        emailInput.value = 'demo@banasuko.com';
        passwordInput.value = 'demo123';
        
        // ログインフォームを自動送信
        if (loginForm) {
          loginForm.dispatchEvent(new Event('submit'));
        }
      }
    });
  }
  
  // 新規登録リンク処理
  const signupLink = document.getElementById('signupLink');
  if (signupLink) {
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 新規登録ページにリダイレクト（またはモーダル表示）
      showSuccess('新規登録機能は準備中です。デモアカウントでお試しください。');
    });
  }
  
  console.log('バナスコAI ログインシステム初期化完了');
});

// ログアウト機能（ダッシュボード用）
function logout() {
  fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  }).then(() => {
    window.location.href = '/login';
  }).catch(error => {
    console.error('Logout error:', error);
    window.location.href = '/login';
  });
}

// グローバルに公開
window.logout = logout;