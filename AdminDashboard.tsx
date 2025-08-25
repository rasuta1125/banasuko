// 運営管理画面コンポーネント
export const AdminDashboard = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Header */}
      <header class="bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mr-4">
                <i class="fas fa-chart-line text-white text-xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-orbitron font-bold text-white">バナスコAI</h1>
                <p class="text-cyber-blue text-sm">運営管理ダッシュボード</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-white font-medium">管理者</p>
                <p class="text-gray-400 text-sm">admin@banasuko.com</p>
              </div>
              <button class="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                <i class="fas fa-sign-out-alt mr-2"></i>ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 統計カード */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 総ユーザー数 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm font-medium">総ユーザー数</p>
                <p class="text-3xl font-bold text-white mt-2" id="totalUsers">-</p>
                <p class="text-cyber-green text-sm mt-1">
                  <i class="fas fa-arrow-up mr-1"></i>
                  <span id="userGrowth">-</span> 今月
                </p>
              </div>
              <div class="w-12 h-12 bg-cyber-blue/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-users text-cyber-blue text-xl"></i>
              </div>
            </div>
          </div>

          {/* アクティブユーザー */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm font-medium">アクティブユーザー</p>
                <p class="text-3xl font-bold text-white mt-2" id="activeUsers">-</p>
                <p class="text-cyber-green text-sm mt-1">
                  <span id="activeRate">-</span>% アクティブ率
                </p>
              </div>
              <div class="w-12 h-12 bg-cyber-green/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-user-check text-cyber-green text-xl"></i>
              </div>
            </div>
          </div>

          {/* 月間収益 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm font-medium">月間収益</p>
                <p class="text-3xl font-bold text-white mt-2">¥<span id="monthlyRevenue">-</span></p>
                <p class="text-cyber-pink text-sm mt-1">
                  <i class="fas fa-arrow-up mr-1"></i>
                  <span id="revenueGrowth">-</span>% 前月比
                </p>
              </div>
              <div class="w-12 h-12 bg-cyber-pink/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-yen-sign text-cyber-pink text-xl"></i>
              </div>
            </div>
          </div>

          {/* 月間API使用数 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm font-medium">月間API使用数</p>
                <p class="text-3xl font-bold text-white mt-2" id="monthlyApiUsage">-</p>
                <p class="text-cyber-orange text-sm mt-1">
                  <span id="apiUsageGrowth">-</span> 前月比
                </p>
              </div>
              <div class="w-12 h-12 bg-cyber-orange/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-bar text-cyber-orange text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ユーザー管理 */}
          <div class="lg:col-span-2">
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-white">
                  <i class="fas fa-users-cog mr-2 text-cyber-blue"></i>ユーザー管理
                </h2>
                <div class="flex space-x-2">
                  <select class="bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm">
                    <option>全プラン</option>
                    <option>フリー</option>
                    <option>ベーシック</option>
                    <option>プレミアム</option>
                  </select>
                  <button class="bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-purple transition-colors text-sm">
                    <i class="fas fa-download mr-2"></i>エクスポート
                  </button>
                </div>
              </div>

              {/* ユーザーテーブル */}
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-gray-700">
                      <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">ユーザー</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">プラン</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">使用数</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">登録日</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium text-sm">操作</th>
                    </tr>
                  </thead>
                  <tbody id="userTableBody">
                    {/* ユーザーデータはJavaScriptで読み込み */}
                    <tr class="border-b border-gray-800 hover:bg-navy-700/30">
                      <td class="py-4 px-4">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center mr-3">
                            <span class="text-white font-semibold text-sm">U</span>
                          </div>
                          <div>
                            <p class="text-white font-medium">ローディング中...</p>
                            <p class="text-gray-400 text-sm">user@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <span class="bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded-lg text-xs font-medium">
                          フリー
                        </span>
                      </td>
                      <td class="py-4 px-4">
                        <div class="text-white text-sm">
                          <div>診断: -/-</div>
                          <div class="text-gray-400">A/B: -/-, コピー: -/-</div>
                        </div>
                      </td>
                      <td class="py-4 px-4 text-gray-400 text-sm">-</td>
                      <td class="py-4 px-4">
                        <div class="flex space-x-2">
                          <button class="text-cyber-blue hover:text-cyber-purple transition-colors text-sm">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="text-cyber-pink hover:text-red-400 transition-colors text-sm">
                            <i class="fas fa-ban"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ページネーション */}
              <div class="flex items-center justify-between mt-6">
                <p class="text-gray-400 text-sm">1-10 of 100 ユーザー</p>
                <div class="flex space-x-2">
                  <button class="bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors">
                    前へ
                  </button>
                  <button class="bg-cyber-blue text-white px-3 py-1 rounded text-sm">1</button>
                  <button class="bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors">
                    2
                  </button>
                  <button class="bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors">
                    次へ
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* サイドパネル */}
          <div class="space-y-6">
            {/* プラン別統計 */}
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
              <h3 class="text-lg font-semibold text-white mb-4">
                <i class="fas fa-chart-pie mr-2 text-cyber-green"></i>プラン別統計
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <span class="text-gray-300 text-sm">フリー</span>
                  </div>
                  <div class="text-right">
                    <span class="text-white font-medium" id="freePlanCount">-</span>
                    <span class="text-gray-400 text-xs ml-1">(<span id="freePlanPercent">-</span>%)</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-cyber-blue rounded-full mr-2"></div>
                    <span class="text-gray-300 text-sm">ベーシック</span>
                  </div>
                  <div class="text-right">
                    <span class="text-white font-medium" id="basicPlanCount">-</span>
                    <span class="text-gray-400 text-xs ml-1">(<span id="basicPlanPercent">-</span>%)</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-cyber-pink rounded-full mr-2"></div>
                    <span class="text-gray-300 text-sm">プレミアム</span>
                  </div>
                  <div class="text-right">
                    <span class="text-white font-medium" id="premiumPlanCount">-</span>
                    <span class="text-gray-400 text-xs ml-1">(<span id="premiumPlanPercent">-</span>%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 最近のアクティビティ */}
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
              <h3 class="text-lg font-semibold text-white mb-4">
                <i class="fas fa-clock mr-2 text-cyber-orange"></i>最近のアクティビティ
              </h3>
              <div class="space-y-3" id="recentActivity">
                <div class="flex items-center text-sm">
                  <div class="w-2 h-2 bg-cyber-green rounded-full mr-3"></div>
                  <div class="flex-1">
                    <span class="text-gray-300">新規ユーザー登録</span>
                    <span class="text-gray-500 ml-2">5分前</span>
                  </div>
                </div>
                <div class="flex items-center text-sm">
                  <div class="w-2 h-2 bg-cyber-blue rounded-full mr-3"></div>
                  <div class="flex-1">
                    <span class="text-gray-300">プラン変更 (Basic→Premium)</span>
                    <span class="text-gray-500 ml-2">12分前</span>
                  </div>
                </div>
                <div class="flex items-center text-sm">
                  <div class="w-2 h-2 bg-cyber-pink rounded-full mr-3"></div>
                  <div class="flex-1">
                    <span class="text-gray-300">AI診断実行</span>
                    <span class="text-gray-500 ml-2">18分前</span>
                  </div>
                </div>
              </div>
            </div>

            {/* システム設定 */}
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
              <h3 class="text-lg font-semibold text-white mb-4">
                <i class="fas fa-cogs mr-2 text-gray-400"></i>システム設定
              </h3>
              <div class="space-y-3">
                <button class="w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-sm">
                      <i class="fas fa-refresh mr-2"></i>使用回数リセット
                    </span>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                  </div>
                </button>
                <button class="w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-sm">
                      <i class="fas fa-download mr-2"></i>データエクスポート
                    </span>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                  </div>
                </button>
                <button class="w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300 text-sm">
                      <i class="fas fa-bell mr-2"></i>通知設定
                    </span>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ユーザー編集モーダル */}
      <div id="editUserModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-md">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">ユーザー編集</h3>
              <button id="closeEditModal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <form id="editUserForm" class="space-y-4">
              <div>
                <label class="block text-gray-300 text-sm mb-2">ユーザー名</label>
                <input type="text" id="editUsername" class="w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none" />
              </div>
              
              <div>
                <label class="block text-gray-300 text-sm mb-2">メールアドレス</label>
                <input type="email" id="editEmail" class="w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none" />
              </div>
              
              <div>
                <label class="block text-gray-300 text-sm mb-2">プラン</label>
                <select id="editPlan" class="w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none">
                  <option value="free">フリー</option>
                  <option value="basic">ベーシック</option>
                  <option value="premium">プレミアム</option>
                </select>
              </div>
              
              <div class="flex space-x-3 pt-4">
                <button type="submit" class="flex-1 bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors">
                  保存
                </button>
                <button type="button" id="cancelEdit" class="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors">
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}