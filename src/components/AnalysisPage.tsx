export const AnalysisPage = () => {
  return (
    <div class="min-h-screen pt-20 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-12 animate-slide-up">
          <h1 class="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span class="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
              🧠 バナー広告 採点AI - バナスコ
            </span>
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            最先端バナスコAI Vision技術が画像を詳細分析し、A/B/C評価・100点満点採点・薬機法チェックを提供
          </p>
        </div>

        {/* バナスコAI Settings */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* バナスコAI設定 */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-blue mb-6">
              <i class="fas fa-cog mr-2"></i>🧠 バナスコAI設定
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  <i class="fas fa-broadcast-tower mr-2"></i>媒体
                </label>
                <select 
                  id="platform"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                  onchange="analysisManager.handlePlatformChange(this.value)"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google広告</option>
                  <option value="Yahoo">Yahoo広告</option>
                  <option value="Twitter">Twitter</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  <i class="fas fa-tag mr-2"></i>カテゴリー
                </label>
                <select 
                  id="category"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                >
                  <option value="広告">広告</option>
                  <option value="投稿">投稿</option>
                  <option value="ストーリー">ストーリー</option>
                  <option value="バナー">バナー</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  <i class="fas fa-bullseye mr-2"></i>目的
                </label>
                <select 
                  id="purpose"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                >
                  <option value="認知度向上">認知度向上</option>
                  <option value="トラフィック獲得">トラフィック獲得</option>
                  <option value="エンゲージメント">エンゲージメント</option>
                  <option value="リード獲得">リード獲得</option>
                  <option value="売上促進">売上促進</option>
                  <option value="アプリ促進">アプリ促進</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  <i class="fas fa-industry mr-2"></i>業界
                </label>
                <select 
                  id="industry"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors"
                  onchange="analysisManager.handleIndustryChange(this.value)"
                >
                  <option value="美容">美容・コスメ</option>
                  <option value="健康">健康・サプリ</option>
                  <option value="医療">医療・クリニック</option>
                  <option value="ファッション">ファッション</option>
                  <option value="食品">食品・飲料</option>
                  <option value="教育">教育・学習</option>
                  <option value="不動産">不動産</option>
                  <option value="金融">金融・保険</option>
                  <option value="旅行">旅行・観光</option>
                  <option value="IT">IT・テクノロジー</option>
                  <option value="エンタメ">エンタメ・ゲーム</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            </div>
            
            {/* 評価方式表示 */}
            <div class="mt-4 p-3 bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 rounded-lg border border-cyber-green/30">
              <p class="text-cyber-green text-sm font-medium">
                <i class="fas fa-star mr-2"></i>📊 バナスコAI評価: A/B/C + 100点満点採点
              </p>
            </div>
          </div>

          {/* バナスコAI 画像アップロード */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-orange mb-6">
              <i class="fas fa-upload mr-2"></i>🖼️ 画像アップロード
            </h3>
            
            {/* パターン選択 */}
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-300 mb-3">分析パターン</label>
              <div class="grid grid-cols-2 gap-4">
                <button 
                  id="singlePatternBtn"
                  onclick="analysisManager.selectAnalysisPattern('single')"
                  class="pattern-btn bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-blue/80 hover:to-cyber-green/80 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 active"
                >
                  <i class="fas fa-image mr-2"></i>単一分析
                </button>
                <button 
                  id="abPatternBtn"
                  onclick="analysisManager.selectAnalysisPattern('ab')"
                  class="pattern-btn bg-navy-700 hover:bg-gradient-to-r hover:from-cyber-purple hover:to-cyber-pink text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                >
                  <i class="fas fa-images mr-2"></i>A/B比較
                </button>
              </div>
            </div>

            {/* 単一パターン用アップロード */}
            <div id="singleUploadSection" class="upload-section">
              <div class="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-cyber-blue transition-colors duration-300">
                <input 
                  type="file" 
                  id="singleImageInput" 
                  accept="image/*" 
                  onchange="analysisManager.handleSingleImageUpload(event)"
                  class="hidden"
                />
                <div id="singleUploadContent">
                  <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                  <p class="text-gray-300 mb-2">バナー画像をアップロード</p>
                  <p class="text-sm text-gray-500 mb-4">PNG, JPG, JPEG (最大10MB)</p>
                  <button 
                    onclick="document.getElementById('singleImageInput').click()" 
                    class="btn btn-primary"
                  >
                    <i class="fas fa-plus mr-2"></i>画像を選択
                  </button>
                </div>
                <div id="singleImagePreview" class="hidden">
                  <img id="singlePreviewImg" src="" alt="Preview" class="max-w-full max-h-64 mx-auto rounded-lg shadow-lg mb-4"/>
                  <p id="singleFileName" class="text-cyber-blue font-medium"></p>
                  <button onclick="analysisManager.removeSingleImage()" class="text-red-400 hover:text-red-300 mt-2">
                    <i class="fas fa-trash mr-1"></i>削除
                  </button>
                </div>
              </div>
            </div>

            {/* A/Bパターン用アップロード */}
            <div id="abUploadSection" class="upload-section hidden">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* パターンA */}
                <div class="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-cyber-blue transition-colors duration-300">
                  <input 
                    type="file" 
                    id="imageAInput" 
                    accept="image/*" 
                    onchange="analysisManager.handleABImageUpload(event, 'A')"
                    class="hidden"
                  />
                  <h4 class="text-lg font-semibold text-cyber-blue mb-4">パターンA</h4>
                  <div id="uploadContentA">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                    <p class="text-gray-300 mb-2">画像A</p>
                    <button 
                      onclick="document.getElementById('imageAInput').click()" 
                      class="btn btn-outline btn-sm"
                    >
                      選択
                    </button>
                  </div>
                  <div id="imagePreviewA" class="hidden">
                    <img id="previewImgA" src="" alt="Preview A" class="max-w-full max-h-48 mx-auto rounded-lg shadow-lg mb-3"/>
                    <p id="fileNameA" class="text-cyber-blue text-sm font-medium"></p>
                    <button onclick="analysisManager.removeABImage('A')" class="text-red-400 hover:text-red-300 mt-2 text-sm">
                      <i class="fas fa-trash mr-1"></i>削除
                    </button>
                  </div>
                </div>

                {/* パターンB */}
                <div class="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-cyber-pink transition-colors duration-300">
                  <input 
                    type="file" 
                    id="imageBInput" 
                    accept="image/*" 
                    onchange="analysisManager.handleABImageUpload(event, 'B')"
                    class="hidden"
                  />
                  <h4 class="text-lg font-semibold text-cyber-pink mb-4">パターンB</h4>
                  <div id="uploadContentB">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                    <p class="text-gray-300 mb-2">画像B</p>
                    <button 
                      onclick="document.getElementById('imageBInput').click()" 
                      class="btn btn-outline btn-sm"
                    >
                      選択
                    </button>
                  </div>
                  <div id="imagePreviewB" class="hidden">
                    <img id="previewImgB" src="" alt="Preview B" class="max-w-full max-h-48 mx-auto rounded-lg shadow-lg mb-3"/>
                    <p id="fileNameB" class="text-cyber-pink text-sm font-medium"></p>
                    <button onclick="analysisManager.removeABImage('B')" class="text-red-400 hover:text-red-300 mt-2 text-sm">
                      <i class="fas fa-trash mr-1"></i>削除
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 分析実行ボタン */}
            <div class="mt-6 text-center">
              <button 
                id="analyzeButton"
                onclick="analysisManager.startAnalysis()"
                disabled
                class="btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="fas fa-brain mr-2"></i>
                <span id="analyzeButtonText">🧠 バナスコAI分析実行</span>
              </button>
              <p class="text-sm text-gray-400 mt-2">
                画像をアップロードすると分析が可能になります
              </p>
            </div>
          </div>
        </div>

        {/* バナスコAI 分析結果セクション */}
        <div id="resultsSection" class="hidden animate-slide-up">
          {/* 単一分析結果 */}
          <div id="singleResult" class="result-section hidden">
            <div class="bg-gradient-to-r from-cyber-blue/20 to-cyber-green/20 rounded-xl p-6 border border-cyber-blue/30 mb-8">
              <h3 class="text-2xl font-semibold text-cyber-blue mb-6 text-center">
                <i class="fas fa-chart-line mr-2"></i>🧠 バナスコAI分析結果
              </h3>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 総合評価 */}
                <div class="bg-navy-800/50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold text-cyber-green mb-3">
                    <i class="fas fa-trophy mr-2"></i>総合評価
                  </h4>
                  <div id="overallRating" class="text-center">
                    <div id="gradeDisplay" class="text-4xl font-bold mb-2"></div>
                    <div id="scoreDisplay" class="text-2xl text-gray-300"></div>
                  </div>
                </div>

                {/* 詳細スコア */}
                <div class="bg-navy-800/50 rounded-lg p-4">
                  <h4 class="text-lg font-semibold text-cyber-orange mb-3">
                    <i class="fas fa-chart-bar mr-2"></i>詳細採点
                  </h4>
                  <div id="detailScores" class="space-y-2">
                    {/* スコアがここに動的に挿入されます */}
                  </div>
                </div>
              </div>

              {/* 薬機法チェック */}
              <div id="complianceCheck" class="mt-6 p-4 rounded-lg">
                <h4 class="text-lg font-semibold mb-3">
                  <i class="fas fa-balance-scale mr-2"></i>⚖️ 薬機法チェック
                </h4>
                <div id="complianceResult" class="text-white">
                  {/* 薬機法結果がここに表示されます */}
                </div>
              </div>

              {/* 改善提案 */}
              <div class="mt-6 bg-navy-800/50 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-cyber-purple mb-3">
                  <i class="fas fa-lightbulb mr-2"></i>💡 改善提案
                </h4>
                <div id="improvements" class="space-y-2 text-gray-300">
                  {/* 改善提案がここに表示されます */}
                </div>
              </div>
            </div>
          </div>

          {/* A/B比較結果 */}
          <div id="abResult" class="result-section hidden">
            <div class="bg-gradient-to-r from-cyber-green/20 to-cyber-orange/20 rounded-xl p-6 border border-cyber-green/30">
              <h4 class="text-xl font-semibold text-cyber-green mb-4 text-center">
                <i class="fas fa-trophy mr-2"></i>📊 A/Bテスト比較結果
              </h4>
              <div id="abComparisonContent" class="text-white">
                {/* A/B比較結果がここに表示されます */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* バナスコAI専用JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // バナスコAI - 分析マネージャー
          class BanascoAnalysisManager {
            constructor() {
              this.selectedPattern = 'single';
              this.uploadedImage = null;
              this.uploadedImageA = null;
              this.uploadedImageB = null;
              this.isAnalyzing = false;
              this.init();
            }
            
            init() {
              console.log('🧠 バナスコAI 初期化完了');
            }
            
            selectAnalysisPattern(pattern) {
              this.selectedPattern = pattern;
              
              // ボタンのアクティブ状態を更新
              document.querySelectorAll('.pattern-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-cyber-blue', 'to-cyber-green');
                btn.classList.add('bg-navy-700', 'text-gray-300');
              });
              
              if (pattern === 'single') {
                document.getElementById('singlePatternBtn').classList.add('active', 'bg-gradient-to-r', 'from-cyber-blue', 'to-cyber-green');
                document.getElementById('singleUploadSection').classList.remove('hidden');
                document.getElementById('abUploadSection').classList.add('hidden');
              } else {
                document.getElementById('abPatternBtn').classList.add('active', 'bg-gradient-to-r', 'from-cyber-purple', 'to-cyber-pink');
                document.getElementById('singleUploadSection').classList.add('hidden');
                document.getElementById('abUploadSection').classList.remove('hidden');
              }
              
              this.updateAnalyzeButton();
            }
            
            handleSingleImageUpload(event) {
              const file = event.target.files[0];
              if (!file) return;
              
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              this.uploadedImage = file;
              
              const reader = new FileReader();
              reader.onload = (e) => {
                document.getElementById('singlePreviewImg').src = e.target.result;
                document.getElementById('singleFileName').textContent = file.name;
                document.getElementById('singleUploadContent').classList.add('hidden');
                document.getElementById('singleImagePreview').classList.remove('hidden');
                this.updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            handleABImageUpload(event, pattern) {
              const file = event.target.files[0];
              if (!file) return;
              
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              if (pattern === 'A') {
                this.uploadedImageA = file;
              } else {
                this.uploadedImageB = file;
              }
              
              const reader = new FileReader();
              reader.onload = (e) => {
                document.getElementById('previewImg' + pattern).src = e.target.result;
                document.getElementById('fileName' + pattern).textContent = file.name;
                document.getElementById('uploadContent' + pattern).classList.add('hidden');
                document.getElementById('imagePreview' + pattern).classList.remove('hidden');
                this.updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            removeSingleImage() {
              this.uploadedImage = null;
              document.getElementById('singleUploadContent').classList.remove('hidden');
              document.getElementById('singleImagePreview').classList.add('hidden');
              document.getElementById('singleImageInput').value = '';
              this.updateAnalyzeButton();
            }
            
            removeABImage(pattern) {
              if (pattern === 'A') {
                this.uploadedImageA = null;
                document.getElementById('imageAInput').value = '';
              } else {
                this.uploadedImageB = null;
                document.getElementById('imageBInput').value = '';
              }
              
              document.getElementById('uploadContent' + pattern).classList.remove('hidden');
              document.getElementById('imagePreview' + pattern).classList.add('hidden');
              this.updateAnalyzeButton();
            }
            
            updateAnalyzeButton() {
              const analyzeBtn = document.getElementById('analyzeButton');
              const btnText = document.getElementById('analyzeButtonText');
              
              if (this.isAnalyzing) {
                analyzeBtn.disabled = true;
                btnText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>分析中...';
                return;
              }
              
              let canAnalyze = false;
              if (this.selectedPattern === 'single') {
                canAnalyze = this.uploadedImage !== null;
                btnText.innerHTML = '<i class="fas fa-brain mr-2"></i>🧠 バナスコAI分析実行';
              } else {
                canAnalyze = this.uploadedImageA !== null && this.uploadedImageB !== null;
                btnText.innerHTML = '<i class="fas fa-brain mr-2"></i>🧠 バナスコAI A/B比較';
              }
              
              analyzeBtn.disabled = !canAnalyze;
            }
            
            async startAnalysis() {
              if (this.isAnalyzing) return;
              
              this.isAnalyzing = true;
              this.updateAnalyzeButton();
              
              try {
                if (this.selectedPattern === 'single') {
                  await this.performSingleAnalysis();
                } else {
                  await this.performABAnalysis();
                }
              } catch (error) {
                console.error('🧠 バナスコAI分析エラー:', error);
                alert('分析中にエラーが発生しました: ' + error.message);
              } finally {
                this.isAnalyzing = false;
                this.updateAnalyzeButton();
              }
            }
            
            async performSingleAnalysis() {
              const formData = new FormData();
              formData.append('image', this.uploadedImage);
              formData.append('platform', document.getElementById('platform').value);
              formData.append('category', document.getElementById('category').value);
              formData.append('purpose', document.getElementById('purpose').value);
              formData.append('industry', document.getElementById('industry').value);
              formData.append('pattern', 'single');
              
              const response = await fetch('/api/analysis/banasco', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                this.displaySingleResults(data.result);
              } else {
                throw new Error(data.message || 'バナスコAI分析に失敗しました');
              }
            }
            
            async performABAnalysis() {
              const formData = new FormData();
              formData.append('imageA', this.uploadedImageA);
              formData.append('imageB', this.uploadedImageB);
              formData.append('platform', document.getElementById('platform').value);
              formData.append('category', document.getElementById('category').value);
              formData.append('purpose', document.getElementById('purpose').value);
              formData.append('industry', document.getElementById('industry').value);
              
              const response = await fetch('/api/analysis/ab-compare', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                this.displayABResults(data.result);
              } else {
                throw new Error(data.message || 'バナスコAI A/B比較に失敗しました');
              }
            }
            
            displaySingleResults(result) {
              console.log('🧠 バナスコAI結果表示:', result);
              
              // 結果セクションを表示
              document.getElementById('resultsSection').classList.remove('hidden');
              document.getElementById('singleResult').classList.remove('hidden');
              document.getElementById('abResult').classList.add('hidden');
              
              // グレード表示
              const gradeDisplay = document.getElementById('gradeDisplay');
              const scoreDisplay = document.getElementById('scoreDisplay');
              
              if (gradeDisplay && scoreDisplay) {
                gradeDisplay.textContent = result.grade || 'B';
                gradeDisplay.className = 'text-4xl font-bold mb-2 ' + this.getGradeColor(result.grade);
                scoreDisplay.textContent = (result.score || 75) + '点 / 100点';
              }
              
              // 薬機法チェック結果
              const complianceResult = document.getElementById('complianceResult');
              if (complianceResult) {
                const compliance = result.compliance || '対象外';
                complianceResult.innerHTML = '<span class="px-3 py-1 rounded-full text-sm font-medium ' + 
                  (compliance.includes('問題なし') ? 'bg-green-600/20 text-green-400' : 
                   compliance.includes('要注意') ? 'bg-red-600/20 text-red-400' : 
                   'bg-gray-600/20 text-gray-400') + '">' + compliance + '</span>';
              }
              
              // 改善提案表示
              const improvements = document.getElementById('improvements');
              if (improvements && result.improvements) {
                improvements.innerHTML = result.improvements.map(imp => 
                  '<div class="flex items-start space-x-2"><i class="fas fa-lightbulb text-cyber-purple mt-1"></i><span>' + imp + '</span></div>'
                ).join('');
              }
              
              // 結果セクションにスクロール
              document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
            }
            
            displayABResults(result) {
              console.log('🧠 バナスコAI A/B結果表示:', result);
              
              // 結果セクションを表示
              document.getElementById('resultsSection').classList.remove('hidden');
              document.getElementById('abResult').classList.remove('hidden');
              document.getElementById('singleResult').classList.add('hidden');
              
              const content = document.getElementById('abComparisonContent');
              if (content && result.comparison) {
                content.innerHTML = '<div class="text-center"><h3 class="text-xl font-semibold text-cyber-green mb-4">勝者: パターン' + 
                  result.comparison.winner + '</h3><p class="text-gray-300 mb-4">' + result.comparison.summary + 
                  '</p><p class="text-cyber-blue">' + result.comparison.recommendation + '</p></div>';
              }
              
              // 結果セクションにスクロール
              document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
            }
            
            getGradeColor(grade) {
              switch (grade) {
                case 'A': return 'text-green-400';
                case 'B': return 'text-yellow-400';  
                case 'C': return 'text-red-400';
                default: return 'text-gray-400';
              }
            }
            
            handlePlatformChange(platform) {
              console.log('媒体変更:', platform);
            }
            
            handleIndustryChange(industry) {
              console.log('業界変更:', industry);
            }
          }
          
          // グローバルインスタンス作成
          let analysisManager;
          
          document.addEventListener('DOMContentLoaded', function() {
            analysisManager = new BanascoAnalysisManager();
          });
        `
      }} />
      
      {/* バナスコAI専用JavaScript */}
      <script src="/static/js/analysis.js"></script>
    </div>
  )
}