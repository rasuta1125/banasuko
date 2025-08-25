// プラン管理コンポーネント
export const PlanManagement = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Header */}
      <header class="bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-crown text-white text-xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-orbitron font-bold text-white">プラン管理</h1>
                <p class="text-cyber-pink text-sm">最適なプランを選択</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <a href="/dashboard" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>ダッシュボードに戻る
              </a>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 現在のプラン表示 */}
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">現在のプラン</h2>
          <div class="inline-block bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 px-8 py-6">
            <div class="flex items-center justify-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <div class="text-left">
                <h3 class="text-xl font-semibold text-white user-plan">フリープラン</h3>
                <p class="text-gray-400 text-sm user-email">user@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* プラン比較表 */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* フリープラン */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8 text-center">
            <div class="mb-6">
              <div class="w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">フリープラン</h3>
              <div class="text-4xl font-bold text-gray-400 mb-2">
                ¥0
                <span class="text-lg font-normal">/月</span>
              </div>
              <p class="text-gray-400 text-sm">個人利用向け</p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AI広告診断</span>
                <span class="text-white font-medium">月10回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">A/B比較分析</span>
                <span class="text-white font-medium">月5回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AIコピー生成</span>
                <span class="text-white font-medium">月3回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">基本レポート</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">メールサポート</span>
                <span class="text-red-400"><i class="fas fa-times"></i></span>
              </div>
            </div>

            <button class="w-full bg-gray-600 text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed" disabled>
              現在のプラン
            </button>
          </div>

          {/* ベーシックプラン */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/30 p-8 text-center relative">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span class="bg-cyber-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                おすすめ
              </span>
            </div>

            <div class="mb-6">
              <div class="w-20 h-20 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">ベーシックプラン</h3>
              <div class="text-4xl font-bold text-cyber-blue mb-2">
                ¥2,980
                <span class="text-lg font-normal">/月</span>
              </div>
              <p class="text-gray-400 text-sm">小〜中規模事業者向け</p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AI広告診断</span>
                <span class="text-white font-medium">月100回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">A/B比較分析</span>
                <span class="text-white font-medium">月50回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AIコピー生成</span>
                <span class="text-white font-medium">月30回</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">詳細レポート</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">メールサポート</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
            </div>

            <button class="plan-select-btn w-full bg-gradient-to-r from-cyber-blue to-cyber-purple text-white py-3 rounded-xl font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105" data-plan="basic">
              ベーシックプランを選択
            </button>
          </div>

          {/* プレミアムプラン */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/30 p-8 text-center relative">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span class="bg-gradient-to-r from-cyber-pink to-cyber-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                プロ向け
              </span>
            </div>

            <div class="mb-6">
              <div class="w-20 h-20 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-crown text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">プレミアムプラン</h3>
              <div class="text-4xl font-bold text-cyber-pink mb-2">
                ¥9,800
                <span class="text-lg font-normal">/月</span>
              </div>
              <p class="text-gray-400 text-sm">大規模事業者・代理店向け</p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AI広告診断</span>
                <span class="text-white font-medium">無制限</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">A/B比較分析</span>
                <span class="text-white font-medium">無制限</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">AIコピー生成</span>
                <span class="text-white font-medium">無制限</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">カスタムレポート</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">優先サポート</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-300">API アクセス</span>
                <span class="text-cyber-green"><i class="fas fa-check"></i></span>
              </div>
            </div>

            <button class="plan-select-btn w-full bg-gradient-to-r from-cyber-pink to-cyber-orange text-white py-3 rounded-xl font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105" data-plan="premium">
              プレミアムプランを選択
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8">
          <h3 class="text-2xl font-bold text-white mb-6 text-center">
            <i class="fas fa-question-circle mr-2 text-cyber-blue"></i>
            よくある質問
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold text-white mb-3">プラン変更について</h4>
              <div class="space-y-4 text-gray-300 text-sm">
                <div>
                  <p class="font-medium text-cyber-blue mb-1">Q: いつでもプランを変更できますか？</p>
                  <p>A: はい、いつでもプランの変更が可能です。変更は即座に適用されます。</p>
                </div>
                <div>
                  <p class="font-medium text-cyber-blue mb-1">Q: ダウングレードはできますか？</p>
                  <p>A: はい、可能です。ただし、使用制限は次回リセット時（月初）に適用されます。</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-white mb-3">料金・支払いについて</h4>
              <div class="space-y-4 text-gray-300 text-sm">
                <div>
                  <p class="font-medium text-cyber-green mb-1">Q: 支払い方法は？</p>
                  <p>A: クレジットカード、銀行振込に対応しています。</p>
                </div>
                <div>
                  <p class="font-medium text-cyber-green mb-1">Q: 無料トライアルはありますか？</p>
                  <p>A: フリープランで機能をお試しいただけます。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* プラン選択確認モーダル */}
      <div id="planSelectModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-lg">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">プラン変更確認</h3>
              <button id="closePlanSelectModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="mb-6">
              <div class="bg-navy-700 rounded-lg p-6 mb-4">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h4 id="selectedPlanName" class="text-xl font-bold text-white">プレミアムプラン</h4>
                    <p class="text-gray-400">に変更します</p>
                  </div>
                  <div class="text-right">
                    <div id="selectedPlanPrice" class="text-2xl font-bold text-cyber-pink">¥9,800</div>
                    <div class="text-gray-400 text-sm">/月</div>
                  </div>
                </div>
                
                <div class="border-t border-gray-600 pt-4">
                  <h5 class="text-white font-medium mb-2">主な機能:</h5>
                  <ul id="selectedPlanFeatures" class="text-gray-300 text-sm space-y-1">
                    <li>• 全機能無制限利用</li>
                    <li>• カスタムレポート作成</li>
                    <li>• 優先サポート</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div class="flex items-start">
                  <i class="fas fa-exclamation-triangle text-yellow-500 mr-2 mt-1"></i>
                  <div class="text-yellow-200 text-sm">
                    <p class="font-medium mb-1">ご注意:</p>
                    <p>プラン変更は即座に適用され、使用制限がリセットされます。課金は変更日から開始されます。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex space-x-3">
              <button id="confirmPlanSelect" class="flex-1 bg-cyber-blue text-white py-3 rounded-lg hover:bg-cyber-purple transition-colors font-semibold">
                変更を確定する
              </button>
              <button id="cancelPlanSelect" class="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Management JavaScript */}
      <script src="/static/js/plan-management.js"></script>
    </div>
  )
}