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
            最先端banaAI Vision技術が画像を詳細分析し、効果予測と改善提案を提供
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
                <label class="block text-sm font-medium text-gray-300 mb-2">表示名</label>
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
                  onchange="handlePlatformChange(this.value)"
                >
                  <option value="">媒体を選択してください</option>
                  <option value="instagram-post">Instagram（投稿）</option>
                  <option value="instagram-ad">Instagram（広告）</option>
                  <option value="gdn">Googleディスプレイ広告</option>
                  <option value="yahoo">Yahooディスプレイ広告</option>
                </select>
              </div>
              
              {/* Instagram広告タイプ詳細（広告選択時に表示） */}
              <div id="instagramAdType" class="hidden">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  <i class="fab fa-instagram mr-2 text-cyber-pink"></i>Instagram広告タイプ
                </label>
                <select 
                  id="instagramAdSubtype"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors"
                >
                  <option value="feed">フィード広告</option>
                  <option value="stories">ストーリーズ広告</option>
                  <option value="reels">リール広告</option>
                  <option value="explore">発見タブ広告</option>
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
            
            {/* スコアタイプ表示 */}
            <div id="scoringTypeInfo" class="mt-4 p-3 bg-navy-800/30 rounded-lg border border-gray-700/50">
              <p class="text-gray-400 text-sm font-medium">📋 媒体を選択してください</p>
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
            
            <div class="border-2 border-dashed border-cyber-purple/30 rounded-xl p-6 sm:p-8 text-center hover:border-cyber-purple/50 transition-colors duration-300">
              <div id="dropZone" class="cursor-pointer">
                <i class="fas fa-image text-4xl sm:text-6xl text-cyber-purple/50 mb-4"></i>
                <p class="text-base sm:text-lg text-gray-300 mb-2">
                  <span class="hidden sm:inline">画像をドラッグ&ドロップまたは</span>クリックしてアップロード
                </p>
                <p class="text-xs sm:text-sm text-gray-400 mb-4">PNG, JPG, JPEG対応（最大10MB）</p>
                
                {/* モバイル向けボタン */}
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                  <button type="button" onclick="document.getElementById('imageUpload').click()" 
                          class="w-full sm:w-auto bg-cyber-purple/20 border border-cyber-purple/50 text-cyber-purple px-4 py-2 rounded-lg hover:bg-cyber-purple/30 transition-colors">
                    <i class="fas fa-folder-open mr-2"></i>ファイルを選択
                  </button>
                  <button type="button" onclick="document.getElementById('cameraUpload').click()" 
                          class="w-full sm:w-auto bg-cyber-blue/20 border border-cyber-blue/50 text-cyber-blue px-4 py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors sm:hidden">
                    <i class="fas fa-camera mr-2"></i>カメラで撮影
                  </button>
                </div>
                
                {/* ファイル入力 */}
                <input type="file" id="imageUpload" class="hidden" 
                       accept="image/png,image/jpeg,image/jpg,image/webp" 
                       capture="environment" />
                {/* カメラ専用入力（モバイル） */}
                <input type="file" id="cameraUpload" class="hidden" 
                       accept="image/*" 
                       capture="environment" />
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
              <div class="border-2 border-dashed border-cyber-blue/30 rounded-xl p-4 sm:p-6 text-center hover:border-cyber-blue/50 transition-colors duration-300">
                <div id="dropZoneA" class="cursor-pointer">
                  <i class="fas fa-image text-3xl sm:text-4xl text-cyber-blue/50 mb-3"></i>
                  <p class="text-sm sm:text-base text-gray-300 mb-2">画像Aをアップロード</p>
                  <div class="flex flex-col gap-2">
                    <button type="button" onclick="document.getElementById('imageUploadA').click()" 
                            class="w-full bg-cyber-blue/20 border border-cyber-blue/50 text-cyber-blue px-3 py-1.5 rounded text-sm hover:bg-cyber-blue/30 transition-colors">
                      <i class="fas fa-folder-open mr-1"></i>選択
                    </button>
                    <button type="button" onclick="document.getElementById('cameraUploadA').click()" 
                            class="w-full bg-cyber-green/20 border border-cyber-green/50 text-cyber-green px-3 py-1.5 rounded text-sm hover:bg-cyber-green/30 transition-colors sm:hidden">
                      <i class="fas fa-camera mr-1"></i>撮影
                    </button>
                  </div>
                  <input type="file" id="imageUploadA" class="hidden" accept="image/png,image/jpeg,image/jpg,image/webp" />
                  <input type="file" id="cameraUploadA" class="hidden" accept="image/*" capture="environment" />
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
              <div class="border-2 border-dashed border-cyber-pink/30 rounded-xl p-4 sm:p-6 text-center hover:border-cyber-pink/50 transition-colors duration-300">
                <div id="dropZoneB" class="cursor-pointer">
                  <i class="fas fa-image text-3xl sm:text-4xl text-cyber-pink/50 mb-3"></i>
                  <p class="text-sm sm:text-base text-gray-300 mb-2">画像Bをアップロード</p>
                  <div class="flex flex-col gap-2">
                    <button type="button" onclick="document.getElementById('imageUploadB').click()" 
                            class="w-full bg-cyber-pink/20 border border-cyber-pink/50 text-cyber-pink px-3 py-1.5 rounded text-sm hover:bg-cyber-pink/30 transition-colors">
                      <i class="fas fa-folder-open mr-1"></i>選択
                    </button>
                    <button type="button" onclick="document.getElementById('cameraUploadB').click()" 
                            class="w-full bg-cyber-green/20 border border-cyber-green/50 text-cyber-green px-3 py-1.5 rounded text-sm hover:bg-cyber-green/30 transition-colors sm:hidden">
                      <i class="fas fa-camera mr-1"></i>撮影
                    </button>
                  </div>
                  <input type="file" id="imageUploadB" class="hidden" accept="image/png,image/jpeg,image/jpg,image/webp" />
                  <input type="file" id="cameraUploadB" class="hidden" accept="image/*" capture="environment" />
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
            onclick="startSingleAnalysis()"
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
          <div id="analysisResult"></div>
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
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            let uploadedImage = null;
            let uploadedImageA = null;
            let uploadedImageB = null;
            let isAnalyzing = false;
            
            // DOM Elements
            const abModeCheckbox = document.getElementById('abMode');
            const singleUpload = document.getElementById('singleUpload');
            const abUpload = document.getElementById('abUpload');
            const dropZone = document.getElementById('dropZone');
            const imageUpload = document.getElementById('imageUpload');
            const imagePreview = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImage');
            const imageName = document.getElementById('imageName');
            const analyzeButton = document.getElementById('analyzeButton');
            const analyzeButtonText = document.getElementById('analyzeButtonText');
            const analyzeSpinner = document.getElementById('analyzeSpinner');
            const resultsSection = document.getElementById('resultsSection');
            const singleResults = document.getElementById('singleResults');
            const abResults = document.getElementById('abResults');
            
            // A/B mode toggle
            abModeCheckbox.addEventListener('change', function() {
              if (this.checked) {
                singleUpload.classList.add('hidden');
                abUpload.classList.remove('hidden');
                updateAnalyzeButton();
              } else {
                singleUpload.classList.remove('hidden');
                abUpload.classList.add('hidden');
                updateAnalyzeButton();
              }
            });
            
            // Single image upload
            dropZone.addEventListener('click', () => {
              imageUpload.click();
            });
            dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.add('border-cyber-purple');
            });
            dropZone.addEventListener('dragleave', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('border-cyber-purple');
            });
            dropZone.addEventListener('drop', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('border-cyber-purple');
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                handleImageUpload(files[0]);
              }
            });
            
            imageUpload.addEventListener('change', (e) => {
              if (e.target.files.length > 0) {
                handleImageUpload(e.target.files[0]);
              }
            });
            
            function handleImageUpload(file) {
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              uploadedImage = file;
              const reader = new FileReader();
              reader.onload = (e) => {
                previewImage.src = e.target.result;
                imageName.textContent = file.name;
                imagePreview.classList.remove('hidden');
                updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            // A/B upload handlers
            setupABUpload('A');
            setupABUpload('B');
            
            function setupABUpload(pattern) {
              const dropZone = document.getElementById('dropZone' + pattern);
              const imageUpload = document.getElementById('imageUpload' + pattern);
              const imagePreview = document.getElementById('imagePreview' + pattern);
              const previewImage = document.getElementById('previewImage' + pattern);
              
              dropZone.addEventListener('click', () => {
                imageUpload.click();
              });
              dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
              });
              dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
              });
              dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  handleABImageUpload(files[0], pattern);
                }
              });
              
              imageUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                  handleABImageUpload(e.target.files[0], pattern);
                }
              });
            }
            
            function handleABImageUpload(file, pattern) {
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              if (pattern === 'A') {
                uploadedImageA = file;
              } else {
                uploadedImageB = file;
              }
              
              const reader = new FileReader();
              reader.onload = (e) => {
                document.getElementById('previewImage' + pattern).src = e.target.result;
                document.getElementById('imagePreview' + pattern).classList.remove('hidden');
                updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            function updateAnalyzeButton() {
              if (isAnalyzing) return;
              
              if (abModeCheckbox.checked) {
                analyzeButton.disabled = !uploadedImageA || !uploadedImageB;
              } else {
                analyzeButton.disabled = !uploadedImage;
              }
            }
            
            // Analysis button handler
            analyzeButton.addEventListener('click', async function() {
              if (isAnalyzing) return;
              
              isAnalyzing = true;
              analyzeButton.disabled = true;
              analyzeButtonText.classList.add('hidden');
              analyzeSpinner.classList.remove('hidden');
              
              try {
                if (abModeCheckbox.checked) {
                  await performABAnalysis();
                } else {
                  await performSingleAnalysis();
                }
              } catch (error) {
                console.error('Analysis error:', error);
                alert('分析中にエラーが発生しました。もう一度お試しください。');
              } finally {
                isAnalyzing = false;
                analyzeButton.disabled = false;
                analyzeButtonText.classList.remove('hidden');
                analyzeSpinner.classList.add('hidden');
                updateAnalyzeButton();
              }
            });
            
            async function performSingleAnalysis() {
              const formData = new FormData();
              formData.append('image', uploadedImage);
              
              const response = await fetch('/api/analysis/single', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displaySingleResults(data.result);
              } else {
                throw new Error(data.message || '分析に失敗しました');
              }
            }
            
            async function performABAnalysis() {
              const formData = new FormData();
              formData.append('imageA', uploadedImageA);
              formData.append('imageB', uploadedImageB);
              
              const response = await fetch('/api/analysis/compare', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displayABResults(data.result);
              } else {
                throw new Error(data.message || 'A/B比較分析に失敗しました');
              }
            }
            
            function displaySingleResults(result) {
              resultsSection.classList.remove('hidden');
              singleResults.classList.remove('hidden');
              abResults.classList.add('hidden');
              
              // Update total score
              document.getElementById('totalScore').textContent = result.totalScore;
              document.getElementById('scoreLevel').textContent = result.level;
              
              // Update individual scores
              const scoresContainer = document.getElementById('individualScores');
              scoresContainer.innerHTML = '';
              
              for (const [key, scoreData] of Object.entries(result.scores)) {
                const scoreDiv = document.createElement('div');
                scoreDiv.className = 'bg-navy-700/50 border border-gray-600 rounded-lg p-3 text-center';
                scoreDiv.innerHTML = \`
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-400">\${scoreData.label}</span>
                    <span class="text-lg font-bold" style="color: \${scoreData.color}">\${scoreData.score}</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="h-2 rounded-full" style="width: \${scoreData.score}%; background-color: \${scoreData.color}"></div>
                  </div>
                \`;
                scoresContainer.appendChild(scoreDiv);
              }
              
              // Update target match
              document.getElementById('targetMatch').textContent = result.analysis.targetMatch + '%';
              
              // Update strengths
              const strengthsList = document.getElementById('strengthsList');
              strengthsList.innerHTML = '';
              result.analysis.strengths.forEach(strength => {
                const li = document.createElement('li');
                li.innerHTML = '<i class="fas fa-check text-cyber-green mr-2"></i>' + strength;
                strengthsList.appendChild(li);
              });
              
              // Update improvements
              const improvementsList = document.getElementById('improvementsList');
              improvementsList.innerHTML = '';
              result.analysis.improvements.forEach(improvement => {
                const li = document.createElement('li');
                li.innerHTML = '<i class="fas fa-arrow-up text-cyber-orange mr-2"></i>' + improvement;
                improvementsList.appendChild(li);
              });
              
              // Update performance metrics
              const performanceContainer = document.getElementById('performanceMetrics');
              performanceContainer.innerHTML = \`
                <div class="bg-gradient-to-r from-green-600/20 to-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-green-400">\${result.analysis.performance.clickRate.improved}%</div>
                  <div class="text-xs text-gray-400">クリック率（+\${result.analysis.performance.clickRate.change}%）</div>
                </div>
                <div class="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-blue-400">\${result.analysis.performance.conversionRate.improved}%</div>
                  <div class="text-xs text-gray-400">コンバージョン率（+\${result.analysis.performance.conversionRate.change}%）</div>
                </div>
                <div class="bg-gradient-to-r from-purple-600/20 to-purple-400/10 border border-purple-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-purple-400">+\${result.analysis.performance.brandAwareness.change}%</div>
                  <div class="text-xs text-gray-400">ブランド認知向上</div>
                </div>
              \`;
              
              // Show note if using demo data
              if (result.note) {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'mt-4 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center';
                noteDiv.innerHTML = '<i class="fas fa-info-circle mr-2 text-yellow-400"></i>' + result.note;
                performanceContainer.parentElement.appendChild(noteDiv);
              }
              
              // Scroll to results
              resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            function displayABResults(result) {
              resultsSection.classList.remove('hidden');
              abResults.classList.remove('hidden');
              singleResults.classList.add('hidden');
              
              // Show note if using demo data
              if (result.note) {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'mb-6 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center';
                noteDiv.innerHTML = '<i class="fas fa-info-circle mr-2 text-yellow-400"></i>' + result.note;
                document.querySelector('#abResults .bg-navy-800\\/50').prepend(noteDiv);
              }
              
              // Scroll to results
              resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
          });
        `
      }} />
      
      {/* 分析ページ専用JavaScript */}
      <script src="/static/js/analysis.js"></script>
    </div>
  )
}