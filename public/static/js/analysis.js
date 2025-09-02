// 古いzipのUIに対応した分析ページ JavaScript
(function () {
  // カテゴリオプションの更新
  window.updateCategoryOptions = function() {
    const platform = document.getElementById('platform').value;
    const category = document.getElementById('category');
    
    // 既存のオプションをクリア
    category.innerHTML = '<option value="">選択してください</option>';
    
    if (platform === 'Instagram') {
      category.innerHTML += `
        <option value="広告">広告</option>
        <option value="投稿">投稿</option>
      `;
    } else if (platform === 'GDN' || platform === 'YDN') {
      category.innerHTML += `
        <option value="広告">広告</option>
      `;
    }
  };

  // ファイルアップロード処理
  window.handleFileUpload = function(input, pattern) {
    const file = input.files[0];
    if (!file) return;

    // ファイルサイズチェック（10MB以下）
    if (file.size > 10 * 1024 * 1024) {
      showError('ファイルサイズは10MB以下にしてください');
      return;
    }

    // ファイル形式チェック
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showError('PNG, JPG, JPEG形式のファイルをアップロードしてください');
      return;
    }

    // プレビュー表示
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewId = pattern === 'A' ? 'previewA' : 'previewB';
      const imageId = pattern === 'A' ? 'imageA' : 'imageB';
      
      document.getElementById(previewId).classList.remove('hidden');
      document.getElementById(imageId).src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // ドラッグ&ドロップ設定
  function setupDragAndDrop() {
    const uploadAreaA = document.getElementById('uploadAreaA');
    const uploadAreaB = document.getElementById('uploadAreaB');
    const fileUploadA = document.getElementById('fileUploadA');
    const fileUploadB = document.getElementById('fileUploadB');

    // Aパターン
    setupDragAndDropForArea(uploadAreaA, fileUploadA, 'A');
    // Bパターン
    setupDragAndDropForArea(uploadAreaB, fileUploadB, 'B');
  }

  function setupDragAndDropForArea(uploadArea, fileInput, pattern) {
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFileUpload(fileInput, pattern);
      }
    });
  }

  // AI診断実行
  window.runAIAnalysis = async function() {
    const fileA = document.getElementById('fileUploadA').files[0];
    const fileB = document.getElementById('fileUploadB').files[0];
    
    if (!fileA || !fileB) {
      showError('AパターンとBパターンの両方の画像をアップロードしてください');
      return;
    }

    // 必須項目チェック
    const requiredFields = ['userName', 'ageGroup', 'platform', 'category', 'adBudget', 'purpose', 'industry', 'genre', 'bannerName'];
    for (const fieldId of requiredFields) {
      const field = document.getElementById(fieldId);
      if (!field.value) {
        showError(`${field.previousElementSibling.textContent}を入力してください`);
        return;
      }
    }

    const analyzeBtn = document.getElementById('analyzeBtn');
    const status = document.getElementById('analysisStatus');
    
    try {
      analyzeBtn.disabled = true;
      status.classList.remove('hidden');
      status.textContent = 'AI診断実行中...';

      // フォームデータの準備
      const formData = new FormData();
      formData.append('imageA', fileA);
      formData.append('imageB', fileB);
      
      // 基本情報
      formData.append('userName', document.getElementById('userName').value);
      formData.append('ageGroup', document.getElementById('ageGroup').value);
      formData.append('platform', document.getElementById('platform').value);
      formData.append('category', document.getElementById('category').value);
      formData.append('adBudget', document.getElementById('adBudget').value);
      formData.append('purpose', document.getElementById('purpose').value);
      
      // 詳細設定
      formData.append('industry', document.getElementById('industry').value);
      formData.append('genre', document.getElementById('genre').value);
      formData.append('scoreFormat', document.querySelector('input[name="scoreFormat"]:checked').value);
      formData.append('bannerName', document.getElementById('bannerName').value);
      
      // 任意項目
      formData.append('aiResult', document.getElementById('aiResult').value);
      formData.append('followerGain', document.getElementById('followerGain').value);
      formData.append('memo', document.getElementById('memo').value);

      // API呼び出し
      const response = await fetch('/api/analysis/compare', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`分析に失敗しました (${response.status})`);
      }

      const result = await response.json();
      
      // 結果表示
      displayAnalysisResults(result);
      
      // 成功メッセージ
      showSuccess('AI診断が完了しました！');
      
      // 利用回数更新
      updateUsageInfo();

    } catch (error) {
      console.error('AI診断エラー:', error);
      showError(error.message || 'AI診断中にエラーが発生しました');
    } finally {
      analyzeBtn.disabled = false;
      status.classList.add('hidden');
    }
  };

  // 分析結果表示
  function displayAnalysisResults(result) {
    const resultsArea = document.getElementById('analysisResults');
    
    const resultsHTML = `
      <div class="cyber-card p-6">
        <h2 class="section-title">📊 AI診断結果</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Aパターン結果 -->
          <div class="analysis-section">
            <h3 class="text-lg font-semibold text-cyber-blue mb-3">Aパターン</h3>
            <div class="score-display">
              <span>${result.scores?.A || '—'}</span>
              <div class="text-sm text-gray-400">
                ${result.scores?.A >= 80 ? '優秀' : result.scores?.A >= 60 ? '良好' : '要改善'}
              </div>
            </div>
            <div class="text-sm text-gray-300">
              ${result.reasons?.A || '分析結果がありません'}
            </div>
          </div>
          
          <!-- Bパターン結果 -->
          <div class="analysis-section">
            <h3 class="text-lg font-semibold text-cyber-pink mb-3">Bパターン</h3>
            <div class="score-display">
              <span>${result.scores?.B || '—'}</span>
              <div class="text-sm text-gray-400">
                ${result.scores?.B >= 80 ? '優秀' : result.scores?.B >= 60 ? '良好' : '要改善'}
              </div>
            </div>
            <div class="text-sm text-gray-300">
              ${result.reasons?.B || '分析結果がありません'}
            </div>
          </div>
        </div>
        
        <!-- 勝者判定 -->
        <div class="text-center p-4 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-lg">
          <h3 class="text-xl font-bold text-white mb-2">🏆 勝者判定</h3>
          <div class="text-2xl font-bold text-cyber-green">
            ${result.winner || '判定できません'}
          </div>
        </div>
      </div>
    `;
    
    resultsArea.innerHTML = resultsHTML;
    resultsArea.classList.remove('hidden');
    
    // 結果までスクロール
    resultsArea.scrollIntoView({ behavior: 'smooth' });
  }

  // 利用状況更新
  async function updateUsageInfo() {
    try {
      const response = await fetch('/api/usage/dashboard', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const usage = await response.json();
        // 利用状況を更新（実装は後で）
        console.log('利用状況更新:', usage);
      }
    } catch (error) {
      console.error('利用状況更新エラー:', error);
    }
  }

  // エラーメッセージ表示
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    errorDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }

  // 成功メッセージ表示
  function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  }

  // 初期化
  document.addEventListener('DOMContentLoaded', () => {
    console.log('古いzipのUI対応分析ページ JavaScript 初期化開始');
    setupDragAndDrop();
    
    // 初期カテゴリオプション設定
    updateCategoryOptions();
  });
})();
