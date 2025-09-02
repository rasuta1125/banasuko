
// バナスコAI - 統一セッション管理対応ログイン機能

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

// フォーム送信処理（統一セッション管理システムを使用）
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
        // 統一セッション管理システムを使用
        const result = await window.sessionManager.login(email, password);
        
        if (result.success) {
          showSuccess('ログインに成功しました！ダッシュボードにリダイレクトします...');
          // セッション管理システムが自動的にリダイレクトを処理
        } else {
          showError(result.error || 'ログインに失敗しました');
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
      
      // 新規登録モーダルを表示
      showSignupModal();
    });
  }
  
  console.log('バナスコAI ログインシステム初期化完了');
});

// 新規登録モーダル表示
function showSignupModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-navy-800/90 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl w-full max-w-md mx-4">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-orbitron font-bold text-white mb-2">新規登録</h2>
        <p class="text-gray-400">新しいアカウントを作成</p>
      </div>
      
      <form id="signupForm" class="space-y-4">
        <div>
          <label for="signupEmail" class="block text-sm font-medium text-gray-300 mb-2">
            <i class="fas fa-envelope mr-2 text-cyber-blue"></i>メールアドレス
          </label>
          <input type="email" id="signupEmail" required placeholder="example@email.com" 
                 class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all">
        </div>
        <div>
          <label for="signupPassword" class="block text-sm font-medium text-gray-300 mb-2">
            <i class="fas fa-lock mr-2 text-cyber-blue"></i>パスワード
          </label>
          <input type="password" id="signupPassword" required placeholder="6文字以上" 
                 class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all">
        </div>
        <div>
          <label for="signupPasswordConfirm" class="block text-sm font-medium text-gray-300 mb-2">
            <i class="fas fa-lock mr-2 text-cyber-blue"></i>パスワード確認
          </label>
          <input type="password" id="signupPasswordConfirm" required placeholder="パスワードを再入力" 
                 class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all">
        </div>
        
        <div id="signupError" class="bg-red-500/20 border border-red-500/30 rounded-xl p-3 hidden">
          <div class="flex items-center">
            <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
            <span id="signupErrorText" class="text-red-300 text-sm"></span>
          </div>
        </div>
        
        <div id="signupSuccess" class="bg-green-500/20 border border-green-500/30 rounded-xl p-3 hidden">
          <div class="flex items-center">
            <i class="fas fa-check-circle text-green-400 mr-2"></i>
            <span id="signupSuccessText" class="text-green-300 text-sm"></span>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button type="submit" id="signupButton" 
                  class="flex-1 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white py-3 px-6 rounded-xl font-semibold hover:from-cyber-purple hover:to-cyber-blue transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyber-blue/25">
            <span id="signupButtonText">登録</span>
            <div id="signupSpinner" class="hidden">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </button>
          <button type="button" id="cancelSignup" 
                  class="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all">
            キャンセル
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // フォーム送信処理
  const signupForm = document.getElementById('signupForm');
  const cancelBtn = document.getElementById('cancelSignup');
  
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    
    // バリデーション
    if (password !== passwordConfirm) {
      showSignupError('パスワードが一致しません');
      return;
    }
    
    if (password.length < 6) {
      showSignupError('パスワードは6文字以上で入力してください');
      return;
    }
    
    // ローディング状態
    setSignupLoading(true);
    hideSignupMessages();
    
    try {
      // 統一セッション管理システムを使用
      const result = await window.sessionManager.register(email, password);
      
      if (result.success) {
        showSignupSuccess('アカウントを作成しました！ダッシュボードにリダイレクトします...');
        // セッション管理システムが自動的にリダイレクトを処理
      } else {
        showSignupError(result.error || 'アカウント作成に失敗しました');
      }
    } catch (error) {
      showSignupError('ネットワークエラーが発生しました');
      console.error('Signup error:', error);
    } finally {
      setSignupLoading(false);
    }
  });
  
  // キャンセルボタン
  cancelBtn.addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  // モーダル外クリックで閉じる
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// 新規登録用のヘルパー関数
function setSignupLoading(isLoading) {
  const signupBtn = document.getElementById('signupButton');
  const signupBtnText = document.getElementById('signupButtonText');
  const signupSpinner = document.getElementById('signupSpinner');
  
  if (signupBtn) {
    signupBtn.disabled = isLoading;
  }
  
  if (signupBtnText) {
    signupBtnText.textContent = isLoading ? '登録中...' : '登録';
  }
  
  if (signupSpinner) {
    signupSpinner.style.display = isLoading ? 'inline-block' : 'none';
  }
}

function showSignupError(message) {
  const errorEl = document.getElementById('signupError');
  const errorText = document.getElementById('signupErrorText');
  
  if (errorEl && errorText) {
    errorText.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

function showSignupSuccess(message) {
  const successEl = document.getElementById('signupSuccess');
  const successText = document.getElementById('signupSuccessText');
  
  if (successEl && successText) {
    successText.textContent = message;
    successEl.classList.remove('hidden');
  }
}

function hideSignupMessages() {
  const errorEl = document.getElementById('signupError');
  const successEl = document.getElementById('signupSuccess');
  
  if (errorEl) errorEl.classList.add('hidden');
  if (successEl) successEl.classList.add('hidden');
}

// ログアウト機能（ダッシュボード用）
function logout() {
  window.sessionManager.logout();
}

// グローバルに公開
window.logout = logout;