export const AnalysisPage = () => {
  return (
    <div class="min-h-screen pt-20 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-12 animate-slide-up">
          <h1 class="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span class="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              AI広告診断
            </span>
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            OpenAI GPT-4o Visionが画像を詳細分析し、効果予測と改善提案を提供
          </p>
        </div>
        
        {/* Analysis Settings */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Basic Info */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-blue mb-6">
              <i class="fas fa-user-cog mr-2"></i>基本情報
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">ユーザー名</label>
                <input 
                  type="text" 
                  id="userName"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors"
                  placeholder="あなたの名前"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">ターゲット年代</label>
                <select 
                  id="ageGroup"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                >
                  <option value="">指定なし</option>
                  <option value="10代">10代</option>
                  <option value="20代">20代</option>
                  <option value="30代">30代</option>
                  <option value="40代">40代</option>
                  <option value="50代">50代</option>
                  <option value="60代以上">60代以上</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">媒体</label>
                <select 
                  id="platform"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="GDN">GDN</option>
                  <option value="YDN">YDN</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">目的</label>
                <select 
                  id="purpose"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                >
                  <option value="プロフィール誘導">プロフィール誘導</option>
                  <option value="リンククリック">リンククリック</option>
                  <option value="保存数増加">保存数増加</option>
                  <option value="インプレッション増加">インプレッション増加</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Industry Info */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-green mb-6">
              <i class="fas fa-industry mr-2"></i>業界情報
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">業界</label>
                <select 
                  id="industry"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-green transition-colors"
                >
                  <option value="美容">美容</option>
                  <option value="飲食">飲食</option>
                  <option value="不動産">不動産</option>
                  <option value="子ども写真館">子ども写真館</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="abMode"
                  class="w-4 h-4 text-cyber-green bg-navy-700 border-gray-600 rounded focus:ring-cyber-green/20 focus:ring-2"
                />
                <label for="abMode" class="ml-2 text-sm font-medium text-gray-300">
                  🆚 A/B比較分析モード
                </label>
              </div>
              <p class="text-xs text-gray-400">2つの画像を比較分析する場合にチェック</p>
            </div>
            
            {/* Analysis Criteria */}
            <div class="mt-6 p-4 bg-navy-700/30 rounded-lg border border-cyber-green/10">
              <h4 class="text-sm font-semibold text-cyber-green mb-3">
                <i class="fas fa-clipboard-list mr-2"></i>採点基準
              </h4>
              <div class="space-y-2 text-xs">
                <div class="flex items-center text-gray-400">
                  <i class="fas fa-bolt mr-2 text-cyber-blue w-4"></i>
                  <span>瞬間伝達力 - 1秒で内容が理解できるか</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <i class="fas fa-eye mr-2 text-cyber-green w-4"></i>
                  <span>視認性 - 文字が読みやすく配色が適切か</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <i class="fas fa-bullseye mr-2 text-cyber-pink w-4"></i>
                  <span>行動喚起 - 明確なCTAでユーザーを誘導</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <i class="fas fa-sync mr-2 text-cyber-orange w-4"></i>
                  <span>整合性 - 画像と文字内容の一致度</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <i class="fas fa-balance-scale mr-2 text-purple-400 w-4"></i>
                  <span>情報バランス - 情報過多にならないか</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Section */}
        <div id="singleUpload" class="mb-12">
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-purple/20 p-8">
            <h3 class="text-2xl font-semibold text-cyber-purple mb-6 text-center">
              <i class="fas fa-cloud-upload-alt mr-2"></i>画像アップロード
            </h3>
            
            <div class="border-2 border-dashed border-cyber-purple/30 rounded-xl p-8 text-center hover:border-cyber-purple/50 transition-colors duration-300">
              <div id="dropZone" class="cursor-pointer">
                <i class="fas fa-image text-6xl text-cyber-purple/50 mb-4"></i>
                <p class="text-lg text-gray-300 mb-2">画像をドラッグ&ドロップまたはクリックしてアップロード</p>
                <p class="text-sm text-gray-400">PNG, JPG, JPEG対応（最大10MB）</p>
                <input type="file" id="imageUpload" class="hidden" accept="image/*" />
              </div>
            </div>
            
            <div id="imagePreview" class="hidden mt-6">
              <img id="previewImage" class="max-w-full h-auto rounded-lg border border-gray-600" />
              <p id="imageName" class="text-sm text-gray-400 mt-2"></p>
            </div>
          </div>
        </div>
        
        {/* A/B Upload Section */}
        <div id="abUpload" class="hidden mb-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pattern A */}
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6">
              <h3 class="text-xl font-semibold text-cyber-blue mb-4 text-center">
                🅰️ パターンA
              </h3>
              <div class="border-2 border-dashed border-cyber-blue/30 rounded-xl p-6 text-center hover:border-cyber-blue/50 transition-colors duration-300">
                <div id="dropZoneA" class="cursor-pointer">
                  <i class="fas fa-image text-4xl text-cyber-blue/50 mb-3"></i>
                  <p class="text-gray-300 mb-1">画像Aをアップロード</p>
                  <p class="text-xs text-gray-400">PNG, JPG, JPEG</p>
                  <input type="file" id="imageUploadA" class="hidden" accept="image/*" />
                </div>
              </div>
              <div id="imagePreviewA" class="hidden mt-4">
                <img id="previewImageA" class="w-full h-auto rounded-lg border border-gray-600" />
              </div>
            </div>
            
            {/* Pattern B */}
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6">
              <h3 class="text-xl font-semibold text-cyber-pink mb-4 text-center">
                🅱️ パターンB
              </h3>
              <div class="border-2 border-dashed border-cyber-pink/30 rounded-xl p-6 text-center hover:border-cyber-pink/50 transition-colors duration-300">
                <div id="dropZoneB" class="cursor-pointer">
                  <i class="fas fa-image text-4xl text-cyber-pink/50 mb-3"></i>
                  <p class="text-gray-300 mb-1">画像Bをアップロード</p>
                  <p class="text-xs text-gray-400">PNG, JPG, JPEG</p>
                  <input type="file" id="imageUploadB" class="hidden" accept="image/*" />
                </div>
              </div>
              <div id="imagePreviewB" class="hidden mt-4">
                <img id="previewImageB" class="w-full h-auto rounded-lg border border-gray-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Analysis Button */}
        <div class="text-center mb-12">
          <button 
            id="analyzeButton" 
            disabled
            class="px-12 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span id="analyzeButtonText">
              <i class="fas fa-rocket mr-3"></i>AI分析開始
            </span>
            <span id="analyzeSpinner" class="hidden">
              <i class="fas fa-spinner fa-spin mr-3"></i>AI分析中...
            </span>
          </button>
        </div>
        
        {/* Results Section */}
        <div id="resultsSection" class="hidden">
          {/* Single Analysis Results */}
          <div id="singleResults" class="hidden">
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-8 mb-8 animate-slide-up">
              <h3 class="text-2xl font-semibold text-cyber-green mb-6 text-center">
                <i class="fas fa-chart-line mr-2"></i>AI分析結果
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Section */}
                <div class="space-y-4">
                  {/* Total Score */}
                  <div class="bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/10 border border-cyber-blue/30 rounded-xl p-6 text-center">
                    <div id="totalScore" class="text-5xl font-orbitron font-bold text-cyber-blue mb-2">82</div>
                    <p class="text-gray-300">総合スコア</p>
                    <p id="scoreLevel" class="text-cyber-green text-sm">優秀レベル</p>
                  </div>
                  
                  {/* Individual Scores */}
                  <div id="individualScores" class="space-y-3">
                    {/* Scores will be populated by JavaScript */}
                  </div>
                </div>
                
                {/* Analysis Details */}
                <div class="lg:col-span-2 space-y-6">
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-blue mb-4">
                      <i class="fas fa-bullseye mr-2"></i>ターゲット適合度
                    </h4>
                    <div class="flex items-center mb-2">
                      <span class="text-2xl font-bold text-cyber-green" id="targetMatch">91%</span>
                      <span class="ml-2 text-gray-400">適合</span>
                    </div>
                    <p class="text-gray-300 text-sm">選択されたターゲット層に対する訴求力が非常に高く、適切なトーンとメッセージングが使用されています。</p>
                  </div>
                  
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-green mb-4">
                      <i class="fas fa-check-circle mr-2"></i>強み・優秀なポイント
                    </h4>
                    <ul id="strengthsList" class="space-y-2 text-sm text-gray-300">
                      {/* Strengths will be populated by JavaScript */}
                    </ul>
                  </div>
                  
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-orange mb-4">
                      <i class="fas fa-exclamation-triangle mr-2"></i>改善提案
                    </h4>
                    <ul id="improvementsList" class="space-y-2 text-sm text-gray-300">
                      {/* Improvements will be populated by JavaScript */}
                    </ul>
                  </div>
                  
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-pink mb-4">
                      <i class="fas fa-chart-area mr-2"></i>予想パフォーマンス
                    </h4>
                    <div id="performanceMetrics" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {/* Performance metrics will be populated by JavaScript */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* A/B Comparison Results */}
          <div id="abResults" class="hidden">
            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-8 mb-8 animate-slide-up">
              <h3 class="text-2xl font-semibold text-cyber-pink mb-6 text-center">
                <i class="fas fa-trophy mr-2"></i>A/B比較分析結果
              </h3>
              
              {/* Winner Announcement */}
              <div id="winnerAnnouncement" class="bg-gradient-to-r from-cyber-pink/20 to-cyber-orange/10 border border-cyber-pink/30 rounded-xl p-8 mb-8 text-center">
                {/* Winner content will be populated by JavaScript */}
              </div>
              
              {/* Detailed Comparison */}
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pattern A Results */}
                <div class="bg-gradient-to-br from-cyber-blue/20 to-navy-700/30 border border-cyber-blue/30 rounded-xl p-6">
                  <h4 class="text-xl font-semibold text-cyber-blue mb-4 text-center">
                    🥇 パターンA (勝者)
                  </h4>
                  <div class="text-center mb-4">
                    <div class="text-3xl font-orbitron font-bold text-cyber-green">87</div>
                    <p class="text-gray-300 text-sm">総合スコア</p>
                  </div>
                  <div id="patternAScores" class="space-y-2">
                    {/* Pattern A scores will be populated by JavaScript */}
                  </div>
                </div>
                
                {/* VS Section */}
                <div class="flex flex-col justify-center items-center">
                  <div class="text-4xl font-orbitron font-bold text-cyber-pink mb-4">VS</div>
                  <div class="text-center">
                    <p class="text-gray-400 text-sm">スコア差</p>
                    <p class="text-2xl font-bold text-cyber-green">+12点</p>
                  </div>
                </div>
                
                {/* Pattern B Results */}
                <div class="bg-gradient-to-br from-gray-500/20 to-navy-700/30 border border-gray-500/30 rounded-xl p-6">
                  <h4 class="text-xl font-semibold text-gray-400 mb-4 text-center">
                    🥈 パターンB
                  </h4>
                  <div class="text-center mb-4">
                    <div class="text-3xl font-orbitron font-bold text-cyber-orange">75</div>
                    <p class="text-gray-300 text-sm">総合スコア</p>
                  </div>
                  <div id="patternBScores" class="space-y-2">
                    {/* Pattern B scores will be populated by JavaScript */}
                  </div>
                </div>
              </div>
              
              {/* Analysis Report */}
              <div class="mt-8 bg-navy-700/30 rounded-xl p-6">
                <h4 class="text-lg font-semibold text-cyber-blue mb-4">
                  <i class="fas fa-clipboard-list mr-2"></i>詳細比較レポート
                </h4>
                <div id="comparisonReport" class="space-y-4 text-sm text-gray-300">
                  {/* Comparison report will be populated by JavaScript */}
                </div>
              </div>
              
              {/* Action Recommendations */}
              <div class="mt-6 bg-gradient-to-r from-cyber-green/20 to-green-600/10 border border-cyber-green/30 rounded-xl p-6">
                <h4 class="text-lg font-semibold text-cyber-green mb-4">
                  <i class="fas fa-bullseye mr-2"></i>実装推奨アクション
                </h4>
                <div id="actionRecommendations" class="space-y-2 text-sm text-white">
                  {/* Action recommendations will be populated by JavaScript */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}