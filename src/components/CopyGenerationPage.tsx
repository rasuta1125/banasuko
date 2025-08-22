export const CopyGenerationPage = () => {
  return (
    <div class="min-h-screen pt-20 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-12 animate-slide-up">
          <h1 class="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span class="bg-gradient-to-r from-cyber-pink to-cyber-orange bg-clip-text text-transparent">
              AIコピー生成
            </span>
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            画像から効果的な広告コピーを自動生成。業界特化型AIが最適なメッセージを提案
          </p>
        </div>
        
        {/* Generation Settings */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Target Settings */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-pink mb-6">
              <i class="fas fa-bullseye mr-2"></i>ターゲット設定
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">業界</label>
                <select 
                  id="copyIndustry"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors"
                >
                  <option value="美容">美容</option>
                  <option value="飲食">飲食</option>
                  <option value="不動産">不動産</option>
                  <option value="子ども写真館">子ども写真館</option>
                  <option value="ファッション">ファッション</option>
                  <option value="教育">教育</option>
                  <option value="その他">その他</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">媒体</label>
                <select 
                  id="copyPlatform"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="GDN">GDN</option>
                  <option value="YDN">YDN</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LINE">LINE広告</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">ターゲット年代</label>
                <select 
                  id="copyAgeGroup"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors"
                >
                  <option value="10代">10代</option>
                  <option value="20代">20代</option>
                  <option value="30代">30代</option>
                  <option value="40代">40代</option>
                  <option value="50代">50代</option>
                  <option value="60代以上">60代以上</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">トーン</label>
                <select 
                  id="copyTone"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors"
                >
                  <option value="フレンドリー">フレンドリー</option>
                  <option value="プロフェッショナル">プロフェッショナル</option>
                  <option value="カジュアル">カジュアル</option>
                  <option value="エレガント">エレガント</option>
                  <option value="エネルギッシュ">エネルギッシュ</option>
                  <option value="信頼感">信頼感</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Generation Options */}
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-6">
            <h3 class="text-xl font-semibold text-cyber-orange mb-6">
              <i class="fas fa-cog mr-2"></i>生成オプション
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">コピータイプ</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" checked class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                    <span class="ml-2 text-sm text-gray-300">メインコピー</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" checked class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                    <span class="ml-2 text-sm text-gray-300">キャッチコピー</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" checked class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                    <span class="ml-2 text-sm text-gray-300">CTAコピー</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                    <span class="ml-2 text-sm text-gray-300">サブコピー</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">生成数</label>
                <select 
                  id="copyCount"
                  class="w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-orange transition-colors"
                >
                  <option value="3">3パターン</option>
                  <option value="5" selected>5パターン</option>
                  <option value="7">7パターン</option>
                  <option value="10">10パターン</option>
                </select>
              </div>
              
              <div>
                <label class="flex items-center">
                  <input type="checkbox" id="includeEmoji" class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                  <span class="ml-2 text-sm text-gray-300">絵文字を含める</span>
                </label>
              </div>
              
              <div>
                <label class="flex items-center">
                  <input type="checkbox" id="urgencyElement" class="w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2" />
                  <span class="ml-2 text-sm text-gray-300">緊急性要素を含める</span>
                </label>
              </div>
            </div>
            
            {/* AI Tips */}
            <div class="mt-6 p-4 bg-cyber-orange/10 rounded-lg border border-cyber-orange/20">
              <h4 class="text-sm font-semibold text-cyber-orange mb-2">
                <i class="fas fa-lightbulb mr-2"></i>AIのポイント
              </h4>
              <ul class="text-xs text-gray-300 space-y-1">
                <li>• 業界特性を考慮した最適化</li>
                <li>• ターゲット層に響く言葉選び</li>
                <li>• 媒体の文字制限に配慮</li>
                <li>• 効果予測スコア付き</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Image Upload */}
        <div class="mb-12">
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-purple/20 p-8">
            <h3 class="text-2xl font-semibold text-cyber-purple mb-6 text-center">
              <i class="fas fa-cloud-upload-alt mr-2"></i>バナー画像アップロード
            </h3>
            
            <div class="border-2 border-dashed border-cyber-purple/30 rounded-xl p-6 sm:p-8 text-center hover:border-cyber-purple/50 transition-colors duration-300">
              <div id="copyDropZone" class="cursor-pointer">
                <i class="fas fa-image text-4xl sm:text-6xl text-cyber-purple/50 mb-4"></i>
                <p class="text-base sm:text-lg text-gray-300 mb-2">
                  <span class="hidden sm:inline">コピー生成用の</span>画像をアップロード
                </p>
                <p class="text-xs sm:text-sm text-gray-400 mb-4">PNG, JPG, JPEG対応（最大10MB）</p>
                
                {/* モバイル向けボタン */}
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                  <button type="button" onclick="document.getElementById('copyImageUpload').click()" 
                          class="w-full sm:w-auto bg-cyber-purple/20 border border-cyber-purple/50 text-cyber-purple px-4 py-2 rounded-lg hover:bg-cyber-purple/30 transition-colors">
                    <i class="fas fa-folder-open mr-2"></i>ファイルを選択
                  </button>
                  <button type="button" onclick="document.getElementById('copyCameraUpload').click()" 
                          class="w-full sm:w-auto bg-cyber-blue/20 border border-cyber-blue/50 text-cyber-blue px-4 py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors sm:hidden">
                    <i class="fas fa-camera mr-2"></i>カメラで撮影
                  </button>
                </div>
                
                <input type="file" id="copyImageUpload" class="hidden" accept="image/png,image/jpeg,image/jpg,image/webp" />
                <input type="file" id="copyCameraUpload" class="hidden" accept="image/*" capture="environment" />
              </div>
            </div>
            
            <div id="copyImagePreview" class="hidden mt-6">
              <img id="copyPreviewImage" class="max-w-full h-auto rounded-lg border border-gray-600 mx-auto" />
              <p id="copyImageName" class="text-sm text-gray-400 mt-2 text-center"></p>
            </div>
          </div>
        </div>
        
        {/* Generate Button */}
        <div class="text-center mb-12">
          <button 
            id="generateButton" 
            disabled
            class="px-12 py-4 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-pink/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span id="generateButtonText">
              <i class="fas fa-magic mr-3"></i>AIコピー生成開始
            </span>
            <span id="generateSpinner" class="hidden">
              <i class="fas fa-spinner fa-spin mr-3"></i>生成中...
            </span>
          </button>
        </div>
        
        {/* Results Section */}
        <div id="copyResultsSection" class="hidden">
          <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-8 animate-slide-up">
            <h3 class="text-2xl font-semibold text-cyber-green mb-6 text-center">
              <i class="fas fa-magic mr-2"></i>生成結果
            </h3>
            
            {/* Overall Analysis */}
            <div class="mb-8 p-6 bg-navy-700/30 rounded-xl">
              <h4 class="text-lg font-semibold text-cyber-blue mb-4">
                <i class="fas fa-chart-bar mr-2"></i>全体分析
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-cyber-green" id="overallScore">88</div>
                  <p class="text-gray-400 text-sm">総合スコア</p>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-cyber-blue" id="industryMatch">95%</div>
                  <p class="text-gray-400 text-sm">業界適合度</p>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-cyber-pink" id="targetAudience">美容意識の高い20-40代女性</div>
                  <p class="text-gray-400 text-sm">推定ターゲット</p>
                </div>
              </div>
            </div>
            
            {/* Generated Copies */}
            <div id="generatedCopies" class="space-y-6">
              {/* Generated copies will be populated by JavaScript */}
            </div>
            
            {/* Recommendations */}
            <div class="mt-8 p-6 bg-gradient-to-r from-cyber-green/20 to-green-600/10 border border-cyber-green/30 rounded-xl">
              <h4 class="text-lg font-semibold text-cyber-green mb-4">
                <i class="fas fa-bullseye mr-2"></i>実装推奨事項
              </h4>
              <div id="copyRecommendations" class="space-y-2 text-sm text-white">
                {/* Recommendations will be populated by JavaScript */}
              </div>
            </div>
            
            {/* Copy to Clipboard */}
            <div class="mt-6 text-center">
              <button 
                id="copyAllButton"
                class="px-8 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105"
              >
                <i class="fas fa-copy mr-2"></i>全てのコピーをクリップボードにコピー
              </button>
            </div>
          </div>
        </div>
        
        {/* Copy Examples Section */}
        <div class="mt-16 bg-navy-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8">
          <h3 class="text-2xl font-semibold text-white mb-6 text-center">
            <i class="fas fa-lightbulb mr-2 text-cyber-blue"></i>生成例プレビュー
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example 1 */}
            <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-blue/20">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-cyber-blue bg-cyber-blue/20 px-2 py-1 rounded">メインコピー</span>
                <span class="text-xs text-cyber-green font-semibold">92%</span>
              </div>
              <p class="text-white text-sm mb-2">"美肌への近道、ここにあり。今すぐ体験してください。"</p>
              <p class="text-gray-400 text-xs">緊急性と具体的なベネフィットを組み合わせた効果的なコピー</p>
            </div>
            
            {/* Example 2 */}
            <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-green/20">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-cyber-green bg-cyber-green/20 px-2 py-1 rounded">キャッチコピー</span>
                <span class="text-xs text-cyber-green font-semibold">89%</span>
              </div>
              <p class="text-white text-sm mb-2">"3日で実感！輝く美肌を手に入れる秘密"</p>
              <p class="text-gray-400 text-xs">数字による具体性と期待感を高める表現が効果的</p>
            </div>
            
            {/* Example 3 */}
            <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-pink/20">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-cyber-pink bg-cyber-pink/20 px-2 py-1 rounded">CTAコピー</span>
                <span class="text-xs text-cyber-green font-semibold">87%</span>
              </div>
              <p class="text-white text-sm mb-2">"限定価格で今すぐ始める"</p>
              <p class="text-gray-400 text-xs">限定性と行動喚起を組み合わせた強力なCTA</p>
            </div>
            
            {/* Example 4 */}
            <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-orange/20">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-cyber-orange bg-cyber-orange/20 px-2 py-1 rounded">サブコピー</span>
                <span class="text-xs text-cyber-green font-semibold">85%</span>
              </div>
              <p class="text-white text-sm mb-2">"94%のユーザーが満足した美容メソッド"</p>
              <p class="text-gray-400 text-xs">社会的証明による信頼性向上</p>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              <i class="fas fa-info-circle mr-2 text-cyber-blue"></i>
              上記は生成例です。実際の画像をアップロードして、あなたのブランドに最適化されたコピーを生成してください。
            </p>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            let uploadedImage = null;
            let isGenerating = false;
            
            // DOM Elements
            const dropZone = document.getElementById('copyDropZone');
            const imageUpload = document.getElementById('copyImageUpload');
            const imagePreview = document.getElementById('copyImagePreview');
            const previewImage = document.getElementById('copyPreviewImage');
            const generateButton = document.getElementById('generateButton');
            const generateButtonText = document.getElementById('generateButtonText');
            const generateSpinner = document.getElementById('generateSpinner');
            const resultsSection = document.getElementById('copyResultsSection');
            
            // Image upload handlers
            if (dropZone && imageUpload) {
              dropZone.addEventListener('click', () => {
                imageUpload.click();
              });
              dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('border-cyber-orange');
              });
              dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-orange');
              });
              dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-orange');
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
            }
            
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
                if (previewImage && imagePreview) {
                  previewImage.src = e.target.result;
                  imagePreview.classList.remove('hidden');
                  updateGenerateButton();
                }
              };
              reader.readAsDataURL(file);
            }
            
            function updateGenerateButton() {
              if (generateButton && !isGenerating) {
                generateButton.disabled = !uploadedImage;
              }
            }
            
            // Generate button handler
            if (generateButton) {
              generateButton.addEventListener('click', async function() {
                if (isGenerating || !uploadedImage) return;
                
                isGenerating = true;
                generateButton.disabled = true;
                if (generateButtonText) generateButtonText.classList.add('hidden');
                if (generateSpinner) generateSpinner.classList.remove('hidden');
                
                try {
                  await performCopyGeneration();
                } catch (error) {
                  console.error('Copy generation error:', error);
                  alert('コピー生成中にエラーが発生しました。もう一度お試しください。');
                } finally {
                  isGenerating = false;
                  generateButton.disabled = false;
                  if (generateButtonText) generateButtonText.classList.remove('hidden');
                  if (generateSpinner) generateSpinner.classList.add('hidden');
                  updateGenerateButton();
                }
              });
            }
            
            async function performCopyGeneration() {
              const formData = new FormData();
              formData.append('image', uploadedImage);
              
              const response = await fetch('/api/copy-generation', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displayCopyResults(data.result);
              } else {
                throw new Error(data.message || 'コピー生成に失敗しました');
              }
            }
            
            function displayCopyResults(result) {
              if (resultsSection) {
                resultsSection.classList.remove('hidden');
                
                // Clear existing results
                const existingResults = resultsSection.querySelector('.copy-results-container');
                if (existingResults) {
                  existingResults.remove();
                }
                
                // Create results container
                const resultsContainer = document.createElement('div');
                resultsContainer.className = 'copy-results-container bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-8 mb-8 animate-slide-up';
                
                resultsContainer.innerHTML = \`
                  <h3 class="text-2xl font-semibold text-cyber-orange mb-6 text-center">
                    <i class="fas fa-magic mr-2"></i>生成されたコピー
                  </h3>
                  
                  \${result.note ? \`
                    <div class="mb-6 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center">
                      <i class="fas fa-info-circle mr-2 text-yellow-400"></i>\${result.note}
                    </div>
                  \` : ''}
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    \${result.copies.map(copy => \`
                      <div class="bg-navy-700/50 border border-gray-600/50 rounded-xl p-6 hover:border-cyber-orange/30 transition-colors">
                        <div class="flex justify-between items-start mb-4">
                          <h4 class="text-lg font-semibold text-cyber-orange">\${copy.type}</h4>
                          <span class="bg-gradient-to-r from-cyber-green/20 to-green-400/10 border border-cyber-green/30 px-3 py-1 rounded-full text-xs font-bold text-cyber-green">
                            効果度: \${copy.effectiveness}%
                          </span>
                        </div>
                        <p class="text-white text-lg mb-4 leading-relaxed">\${copy.text}</p>
                        <p class="text-gray-400 text-sm">\${copy.reasoning}</p>
                        <button class="mt-3 px-4 py-2 bg-cyber-orange/20 border border-cyber-orange/30 rounded-lg text-cyber-orange text-sm hover:bg-cyber-orange/30 transition-colors" onclick="navigator.clipboard.writeText('\${copy.text}'); this.textContent='コピー済み!'; setTimeout(() => this.textContent='コピー', 2000)">
                          <i class="fas fa-copy mr-2"></i>コピー
                        </button>
                      </div>
                    \`).join('')}
                  </div>
                  
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-green mb-4">
                      <i class="fas fa-chart-line mr-2"></i>分析サマリー
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-cyber-green">\${result.analysis.overallScore}</div>
                        <p class="text-gray-400 text-sm">総合スコア</p>
                      </div>
                      <div class="text-center">
                        <div class="text-2xl font-bold text-cyber-blue">\${result.analysis.industryMatch}%</div>
                        <p class="text-gray-400 text-sm">業界適合度</p>
                      </div>
                      <div class="text-center">
                        <div class="text-lg font-semibold text-cyber-pink">\${result.analysis.targetAudience}</div>
                        <p class="text-gray-400 text-sm">想定ターゲット</p>
                      </div>
                    </div>
                    
                    <div class="mt-6">
                      <h5 class="text-md font-semibold text-cyber-orange mb-3">実装推奨事項</h5>
                      <ul class="space-y-2">
                        \${result.analysis.recommendations.map(rec => \`
                          <li class="text-gray-300 text-sm">
                            <i class="fas fa-check-circle text-cyber-green mr-2"></i>\${rec}
                          </li>
                        \`).join('')}
                      </ul>
                    </div>
                  </div>
                \`;
                
                resultsSection.appendChild(resultsContainer);
                
                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
              }
            }
          });
        `
      }} />
    </div>
  )
}