export const LoginPage = () => {
  return (
    <div class="min-h-screen pt-20 pb-20">
      <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl animate-slide-up">
          {/* Header */}
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <i class="fas fa-user-circle text-3xl text-white"></i>
            </div>
            <h1 class="text-3xl font-orbitron font-bold text-white mb-2">ログイン</h1>
            <p class="text-gray-400">バナスコAIにアクセス</p>
          </div>
          
          {/* Login Form */}
          <form id="loginForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-envelope mr-2 text-cyber-blue"></i>メールアドレス
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                placeholder="メールアドレスを入力"
                required
                autocomplete="email"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-lock mr-2 text-cyber-blue"></i>パスワード
              </label>
              <input 
                type="password" 
                id="password"
                name="password"
                class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                placeholder="パスワードを入力"
                required
              />
            </div>
            
            {/* Error Message */}
            <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div class="flex items-center text-red-400">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <span id="errorText">エラーメッセージ</span>
              </div>
            </div>
            
            {/* Success Message */}
            <div id="successMessage" class="hidden bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div class="flex items-center text-green-400">
                <i class="fas fa-check-circle mr-2"></i>
                <span id="successText">ログイン成功</span>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              type="submit"
              id="loginButton"
              class="w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl text-white font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span id="loginButtonText">
                <i class="fas fa-sign-in-alt mr-2"></i>ログイン
              </span>
              <span id="loginSpinner" class="hidden">
                <i class="fas fa-spinner fa-spin mr-2"></i>ログイン中...
              </span>
            </button>
          </form>
          
          {/* Divider */}
          <div class="my-8 flex items-center">
            <div class="flex-1 border-t border-gray-600"></div>
            <span class="px-4 text-gray-400 text-sm">または</span>
            <div class="flex-1 border-t border-gray-600"></div>
          </div>
          
          {/* Demo Account */}
          <div class="bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl p-6 mb-6">
            <h3 class="text-lg font-semibold text-cyber-blue mb-3">
              <i class="fas fa-rocket mr-2"></i>デモアカウント
            </h3>
            <p class="text-gray-300 text-sm mb-4">
              すぐにお試しいただけるデモアカウントをご用意しています
            </p>
            <div class="bg-navy-700/50 rounded-lg p-4 mb-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-400">メールアドレス:</span>
                  <div class="text-cyber-blue font-mono font-semibold">demo@banasuko.com</div>
                </div>
                <div>
                  <span class="text-gray-400">パスワード:</span>
                  <div class="text-cyber-blue font-mono font-semibold">demo123</div>
                </div>
              </div>
            </div>
            <button 
              type="button"
              id="demoLoginBtn"
              class="w-full py-2 bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg text-cyber-blue font-medium hover:bg-cyber-blue/30 transition-all duration-300"
            >
              <i class="fas fa-magic mr-2"></i>デモアカウントでログイン
            </button>
          </div>
          
          {/* Register Link */}
          <div class="text-center">
            <button 
              id="showRegisterForm"
              class="text-cyber-pink hover:text-cyber-orange transition-colors duration-300"
            >
              <i class="fas fa-user-plus mr-2"></i>新規アカウント作成
            </button>
          </div>
        </div>
        
        {/* Register Form */}
        <div id="registerForm" class="hidden mt-8 bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-pink/20 p-8 shadow-2xl animate-slide-up">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <i class="fas fa-user-plus text-3xl text-white"></i>
            </div>
            <h1 class="text-3xl font-orbitron font-bold text-white mb-2">新規登録</h1>
            <p class="text-gray-400">バナスコAIアカウント作成</p>
          </div>
          
          <form id="registerForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas-envelope mr-2 text-cyber-pink"></i>メールアドレス
              </label>
              <input 
                type="email" 
                id="registerEmail"
                name="email"
                class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                placeholder="メールアドレスを入力"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-lock mr-2 text-cyber-pink"></i>パスワード
              </label>
              <input 
                type="password" 
                id="registerPassword"
                name="password"
                class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                placeholder="パスワードを入力"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                <i class="fas fa-lock mr-2 text-cyber-pink"></i>パスワード（確認）
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                class="w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300"
                placeholder="パスワードを再入力"
                required
              />
            </div>
            
            {/* Register Error Message */}
            <div id="regErrorMessage" class="hidden bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div class="flex items-center text-red-400">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <span id="regErrorText">エラーメッセージ</span>
              </div>
            </div>
            
            {/* Register Success Message */}
            <div id="regSuccessMessage" class="hidden bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div class="flex items-center text-green-400">
                <i class="fas fa-check-circle mr-2"></i>
                <span id="regSuccessText">登録成功</span>
              </div>
            </div>
            
            {/* Register Button */}
            <button 
              type="submit"
              id="registerButton"
              class="w-full py-3 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-xl text-white font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-pink/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span id="registerButtonText">
                <i class="fas fa-user-plus mr-2"></i>アカウント作成
              </span>
              <span id="registerSpinner" class="hidden">
                <i class="fas fa-spinner fa-spin mr-2"></i>作成中...
              </span>
            </button>
          </form>
          
          <div class="text-center mt-6">
            <button 
              id="showLoginForm"
              class="text-cyber-blue hover:text-cyber-purple transition-colors duration-300"
            >
              <i class="fas fa-arrow-left mr-2"></i>ログインに戻る
            </button>
          </div>
        </div>
        
        {/* Features Info */}
        <div class="mt-12 bg-navy-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
          <h3 class="text-lg font-semibold text-white mb-4 text-center">
            <i class="fas fa-star mr-2 text-cyber-blue"></i>ログイン後の機能
          </h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center text-gray-300">
              <i class="fas fa-chart-line mr-3 text-cyber-blue w-4"></i>
              <span>AI広告診断 - 詳細分析とスコアリング</span>
            </div>
            <div class="flex items-center text-gray-300">
              <i class="fas fa-balance-scale mr-3 text-cyber-green w-4"></i>
              <span>A/B比較分析 - 統計的有意性に基づく判定</span>
            </div>
            <div class="flex items-center text-gray-300">
              <i class="fas fa-magic mr-3 text-cyber-pink w-4"></i>
              <span>AIコピー生成 - 効果的な広告文の自動生成</span>
            </div>
            <div class="flex items-center text-gray-300">
              <i class="fas fa-chart-area mr-3 text-cyber-orange w-4"></i>
              <span>効果予測レポート - ROI・CVR改善予測</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Animation */}
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-blue rounded-full animate-ping opacity-20"></div>
        <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-cyber-pink rounded-full animate-ping opacity-30 delay-1000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyber-green rounded-full animate-ping opacity-25 delay-2000"></div>
      </div>

      {/* Firebase SDK */}
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
      
      {/* Firebase Authentication JavaScript */}
      <script src="/static/js/auth.js"></script>
    </div>
  )
}