// バナスコAI 分析ページ JavaScript
// 画像アップロード・分析機能・媒体分岐

class AnalysisManager {
  constructor() {
    this.currentUser = null;
    this.selectedPlatform = '';
    this.scoringType = 'score'; // 'score' (100点満点) or 'grade' (A/B/C評価)
    
    this.init();
  }

  async init() {
    try {
      // 認証状態チェック
      await this.checkAuthState();
      
      if (!this.currentUser) {
        window.location.href = '/login';
        return;
      }

      // イベントリスナー設定
      this.setupEventListeners();
      
      console.log('分析ページ初期化完了');
    } catch (error) {
      console.error('分析ページ初期化エラー:', error);
    }
  }

  // 認証状態チェック
  async checkAuthState() {
    try {
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.currentUser = data.user;
          return;
        }
      }
      
      this.currentUser = null;
    } catch (error) {
      console.error('認証状態チェックエラー:', error);
      this.currentUser = null;
    }
  }

  // イベントリスナー設定
  setupEventListeners() {
    // 媒体変更時の処理
    const platformSelect = document.getElementById('platform');
    if (platformSelect) {
      platformSelect.addEventListener('change', (e) => {
        this.handlePlatformChange(e.target.value);
      });
    }

    // 分析タイプ切り替え
    const analyzeButtons = document.querySelectorAll('[data-analysis-type]');
    analyzeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.switchAnalysisType(e.target.dataset.analysisType);
      });
    });

    // ファイルアップロード処理
    this.setupFileUpload();
  }

  // 媒体変更時の処理
  handlePlatformChange(platform) {
    this.selectedPlatform = platform;
    const instagramAdType = document.getElementById('instagramAdType');
    
    // Instagram広告の場合、詳細選択を表示
    if (platform === 'instagram-ad') {
      if (instagramAdType) {
        instagramAdType.classList.remove('hidden');
      }
      this.scoringType = 'grade'; // A/B/C評価
    } else {
      if (instagramAdType) {
        instagramAdType.classList.add('hidden');
      }
      
      // スコアタイプ設定
      if (platform === 'instagram-post') {
        this.scoringType = 'score'; // 100点満点
      } else if (platform === 'gdn' || platform === 'yahoo') {
        this.scoringType = 'grade'; // A/B/C評価
      }
    }
    
    // UI更新
    this.updateScoringTypeDisplay();
    
    console.log(`媒体変更: ${platform}, スコアタイプ: ${this.scoringType}`);
  }

  // スコアタイプ表示更新
  updateScoringTypeDisplay() {
    const scoringInfo = document.getElementById('scoringTypeInfo');
    if (!scoringInfo) return;

    let infoText = '';
    let colorClass = '';

    switch (this.selectedPlatform) {
      case 'instagram-post':
        infoText = '📊 Instagram投稿：100点満点で採点';
        colorClass = 'text-cyber-blue';
        break;
      case 'instagram-ad':
        infoText = '🎯 Instagram広告：A/B/C評価で判定';
        colorClass = 'text-cyber-pink';
        break;
      case 'gdn':
        infoText = '🎯 Googleディスプレイ広告：A/B/C評価で判定';
        colorClass = 'text-cyber-green';
        break;
      case 'yahoo':
        infoText = '🎯 Yahooディスプレイ広告：A/B/C評価で判定';
        colorClass = 'text-cyber-orange';
        break;
      default:
        infoText = '📋 媒体を選択してください';
        colorClass = 'text-gray-400';
    }

    scoringInfo.innerHTML = `<p class="${colorClass} text-sm font-medium">${infoText}</p>`;
  }

  // ファイルアップロード設定
  setupFileUpload() {
    // 単体分析用
    this.setupSingleUpload();
    
    // A/B分析用
    this.setupABUpload();
  }

  // 単体分析アップロード
  setupSingleUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('imageUpload');
    const cameraInput = document.getElementById('cameraUpload');

    if (dropZone && fileInput) {
      // ドラッグ&ドロップ
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-cyber-purple');
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-cyber-purple');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-cyber-purple');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleImageUpload(files[0], 'single');
        }
      });

      // クリックでファイル選択
      dropZone.addEventListener('click', () => {
        fileInput.click();
      });

      // ファイル選択時
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleImageUpload(e.target.files[0], 'single');
        }
      });

      // カメラ撮影時
      if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            this.handleImageUpload(e.target.files[0], 'single');
          }
        });
      }
    }
  }

  // A/B分析アップロード
  setupABUpload() {
    // パターンA
    this.setupABSingleUpload('A');
    // パターンB
    this.setupABSingleUpload('B');
  }

  // A/B個別アップロード設定
  setupABSingleUpload(pattern) {
    const dropZone = document.getElementById(`dropZone${pattern}`);
    const fileInput = document.getElementById(`imageUpload${pattern}`);
    const cameraInput = document.getElementById(`cameraUpload${pattern}`);

    if (dropZone && fileInput) {
      // ドラッグ&ドロップ
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        const colorClass = pattern === 'A' ? 'border-cyber-blue' : 'border-cyber-pink';
        dropZone.classList.add(colorClass);
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        const colorClass = pattern === 'A' ? 'border-cyber-blue' : 'border-cyber-pink';
        dropZone.classList.remove(colorClass);
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const colorClass = pattern === 'A' ? 'border-cyber-blue' : 'border-cyber-pink';
        dropZone.classList.remove(colorClass);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleImageUpload(files[0], `ab${pattern}`);
        }
      });

      // ファイル選択時
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleImageUpload(e.target.files[0], `ab${pattern}`);
        }
      });

      // カメラ撮影時
      if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            this.handleImageUpload(e.target.files[0], `ab${pattern}`);
          }
        });
      }
    }
  }

  // 画像アップロード処理
  async handleImageUpload(file, type) {
    // ファイルサイズチェック（10MB以下）
    if (file.size > 10 * 1024 * 1024) {
      this.showError('ファイルサイズは10MB以下にしてください');
      return;
    }

    // ファイル形式チェック
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.showError('PNG, JPG, JPEG, WEBP形式のファイルをアップロードしてください');
      return;
    }

    try {
      // プレビュー表示
      await this.showImagePreview(file, type);
      
      console.log(`画像アップロード成功: ${type}`, file.name);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      this.showError('画像のアップロードに失敗しました');
    }
  }

  // 画像プレビュー表示
  async showImagePreview(file, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        let previewContainer, previewImage, imageName;
        
        switch (type) {
          case 'single':
            previewContainer = document.getElementById('imagePreview');
            previewImage = document.getElementById('previewImage');
            imageName = document.getElementById('imageName');
            break;
          case 'abA':
            previewContainer = document.getElementById('imagePreviewA');
            previewImage = document.getElementById('previewImageA');
            break;
          case 'abB':
            previewContainer = document.getElementById('imagePreviewB');
            previewImage = document.getElementById('previewImageB');
            break;
          default:
            reject(new Error('不正なアップロードタイプ'));
            return;
        }

        if (previewContainer && previewImage) {
          previewImage.src = e.target.result;
          previewContainer.classList.remove('hidden');
          
          if (imageName) {
            imageName.textContent = file.name;
          }
        }
        
        resolve();
      };
      
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // 分析タイプ切り替え
  switchAnalysisType(type) {
    const singleUpload = document.getElementById('singleUpload');
    const abUpload = document.getElementById('abUpload');
    const singleBtn = document.querySelector('[data-analysis-type="single"]');
    const abBtn = document.querySelector('[data-analysis-type="ab"]');

    if (type === 'single') {
      singleUpload?.classList.remove('hidden');
      abUpload?.classList.add('hidden');
      singleBtn?.classList.add('bg-cyber-purple', 'text-white');
      singleBtn?.classList.remove('bg-gray-700', 'text-gray-300');
      abBtn?.classList.add('bg-gray-700', 'text-gray-300');
      abBtn?.classList.remove('bg-cyber-green', 'text-white');
    } else if (type === 'ab') {
      singleUpload?.classList.add('hidden');
      abUpload?.classList.remove('hidden');
      abBtn?.classList.add('bg-cyber-green', 'text-white');
      abBtn?.classList.remove('bg-gray-700', 'text-gray-300');
      singleBtn?.classList.add('bg-gray-700', 'text-gray-300');
      singleBtn?.classList.remove('bg-cyber-purple', 'text-white');
    }
  }

  // エラーメッセージ表示
  showError(message) {
    // 既存のエラーメッセージを削除
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // 新しいエラーメッセージを作成
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fixed top-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up';
    errorDiv.innerHTML = `
      <div class="flex items-center">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(errorDiv);

    // 5秒後に自動削除
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// グローバル関数として媒体変更処理を公開
window.handlePlatformChange = function(platform) {
  if (window.analysisManager) {
    window.analysisManager.handlePlatformChange(platform);
  }
};

// DOM読み込み完了時に初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('分析ページ JavaScript 初期化開始');
  window.analysisManager = new AnalysisManager();
});