// ユーザーダッシュボード - 使用状況・プラン管理
export const UserDashboard = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Header */}
      <header class="bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-user text-white text-xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-orbitron font-bold text-white">マイダッシュボード</h1>
                <p class="text-cyber-blue text-sm">バナスコAI 使用状況</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-white font-medium user-name">ユーザー名</p>
                <p class="text-gray-400 text-sm user-plan">プラン</p>
              </div>
              <button class="logout-btn bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                <i class="fas fa-sign-out-alt mr-2"></i>ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ユーザー情報カード */}
        <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6 mb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-20 h-20 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mr-6">
                <i class="fas fa-user-circle text-white text-3xl"></i>
              </div>
              <div>
                <h2 class="text-2xl font-semibold text-white user-name">ユーザー名</h2>
                <p class="text-gray-400 user-email">user@example.com</p>
                <div class="flex items-center mt-2">
                  <span class="bg-cyber-blue/20 text-cyber-blue px-3 py-1 rounded-lg text-sm font-medium user-plan">
                    フリープラン
                  </span>
                  <span class="ml-3 text-gray-400 text-sm">
                    <i class="fas fa-calendar mr-1"></i>
                    <span id="daysUntilReset">-</span>日でリセット
                  </span>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <button id="upgradePlanBtn" class="bg-gradient-to-r from-cyber-pink to-cyber-orange text-white px-6 py-3 rounded-xl font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
                <i class="fas fa-crown mr-2"></i>プランアップグレード
              </button>
            </div>
          </div>
        </div>

        {/* 使用統計 */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* AI広告診断 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center mr-3">
                  <i class="fas fa-chart-line text-cyber-blue"></i>
                </div>
                <h3 class="text-lg font-semibold text-white">AI広告診断</h3>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400 text-sm">今月の使用量</span>
                <span class="text-white font-medium usage-single-analysis">-/-</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div id="singleAnalysisProgress" class="bg-cyber-blue h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">使用率</span>
                <span id="singleAnalysisPercentage" class="text-xs text-cyber-blue">0%</span>
              </div>
            </div>
            
            <a href="/analysis" class="block w-full bg-cyber-blue/20 text-cyber-blue text-center py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors text-sm font-medium">
              <i class="fas fa-play mr-2"></i>診断を開始
            </a>
          </div>

          {/* A/B比較分析 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-cyber-green/20 rounded-xl flex items-center justify-center mr-3">
                  <i class="fas fa-balance-scale text-cyber-green"></i>
                </div>
                <h3 class="text-lg font-semibold text-white">A/B比較分析</h3>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400 text-sm">今月の使用量</span>
                <span class="text-white font-medium usage-ab-comparison">-/-</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div id="abComparisonProgress" class="bg-cyber-green h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">使用率</span>
                <span id="abComparisonPercentage" class="text-xs text-cyber-green">0%</span>
              </div>
            </div>
            
            <a href="/analysis" class="block w-full bg-cyber-green/20 text-cyber-green text-center py-2 rounded-lg hover:bg-cyber-green/30 transition-colors text-sm font-medium">
              <i class="fas fa-play mr-2"></i>比較を開始
            </a>
          </div>

          {/* AIコピー生成 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-cyber-pink/20 rounded-xl flex items-center justify-center mr-3">
                  <i class="fas fa-magic text-cyber-pink"></i>
                </div>
                <h3 class="text-lg font-semibold text-white">AIコピー生成</h3>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-400 text-sm">今月の使用量</span>
                <span class="text-white font-medium usage-copy-generation">-/-</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div id="copyGenerationProgress" class="bg-cyber-pink h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">使用率</span>
                <span id="copyGenerationPercentage" class="text-xs text-cyber-pink">0%</span>
              </div>
            </div>
            
            <a href="/copy-generation" class="block w-full bg-cyber-pink/20 text-cyber-pink text-center py-2 rounded-lg hover:bg-cyber-pink/30 transition-colors text-sm font-medium">
              <i class="fas fa-play mr-2"></i>生成を開始
            </a>
          </div>
        </div>

        {/* プラン比較・アップグレード */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近のアクティビティ */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
            <h3 class="text-xl font-semibold text-white mb-6">
              <i class="fas fa-clock mr-2 text-cyber-orange"></i>最近のアクティビティ
            </h3>
            
            <div class="space-y-4" id="recentActivity">
              <div class="flex items-center p-3 bg-navy-700/30 rounded-lg">
                <div class="w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center mr-3">
                  <i class="fas fa-chart-line text-cyber-blue text-sm"></i>
                </div>
                <div class="flex-1">
                  <p class="text-white text-sm">AI広告診断を実行</p>
                  <p class="text-gray-400 text-xs">2分前</p>
                </div>
              </div>
              
              <div class="text-center py-8 text-gray-500">
                <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
                <p>アクティビティを読み込み中...</p>
              </div>
            </div>
          </div>

          {/* プランアップグレード */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
            <h3 class="text-xl font-semibold text-white mb-6">
              <i class="fas fa-crown mr-2 text-cyber-pink"></i>プラン変更
            </h3>
            
            <div class="space-y-4">
              {/* フリープラン */}
              <div class="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-lg font-semibold text-white">フリープラン</h4>
                  <span class="text-gray-400 font-bold">¥0</span>
                </div>
                <ul class="text-gray-300 text-sm space-y-1 mb-3">
                  <li>• AI広告診断 月10回まで</li>
                  <li>• A/B比較分析 月5回まで</li>
                  <li>• AIコピー生成 月3回まで</li>
                </ul>
                <button class="w-full bg-gray-600 text-gray-400 py-2 rounded-lg cursor-not-allowed" disabled>
                  現在のプラン
                </button>
              </div>

              {/* ベーシックプラン */}
              <div class="p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-lg font-semibold text-white">ベーシックプラン</h4>
                  <span class="text-cyber-blue font-bold">¥2,980<span class="text-sm">/月</span></span>
                </div>
                <ul class="text-gray-300 text-sm space-y-1 mb-3">
                  <li>• AI広告診断 月100回まで</li>
                  <li>• A/B比較分析 月50回まで</li>
                  <li>• AIコピー生成 月30回まで</li>
                  <li>• 詳細レポート・統計機能</li>
                </ul>
                <button class="upgrade-plan-btn w-full bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors" data-plan="basic">
                  ベーシックにアップグレード
                </button>
              </div>

              {/* プレミアムプラン */}
              <div class="p-4 bg-cyber-pink/10 rounded-lg border border-cyber-pink/30">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-lg font-semibold text-white">プレミアムプラン</h4>
                  <span class="text-cyber-pink font-bold">¥9,800<span class="text-sm">/月</span></span>
                </div>
                <ul class="text-gray-300 text-sm space-y-1 mb-3">
                  <li>• 全機能 無制限利用</li>
                  <li>• 高度な分析・予測機能</li>
                  <li>• カスタムレポート作成</li>
                  <li>• API アクセス</li>
                </ul>
                <button class="upgrade-plan-btn w-full bg-cyber-pink text-white py-2 rounded-lg hover:bg-pink-500 transition-colors" data-plan="premium">
                  プレミアムにアップグレード
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* プラン変更確認モーダル */}
      <div id="planChangeModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">プラン変更確認</h3>
              <button id="closePlanModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="mb-6">
              <p class="text-gray-300 mb-2">以下のプランに変更しますか？</p>
              <div class="bg-navy-700 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <span id="newPlanName" class="text-white font-medium">プレミアムプラン</span>
                  <span id="newPlanPrice" class="text-cyber-pink font-bold">¥9,800/月</span>
                </div>
              </div>
              <p class="text-gray-400 text-sm mt-2">
                ※ プラン変更は即座に適用され、使用制限がリセットされます。
              </p>
            </div>
            
            <div class="flex space-x-3">
              <button id="confirmPlanChange" class="flex-1 bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors">
                変更する
              </button>
              <button id="cancelPlanChange" class="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard JavaScript */}
      <script src="/static/js/dashboard.js"></script>
    </div>
  )
}