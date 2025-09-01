// バナスコAI ユーザーダッシュボード JavaScript
// 統一セッション管理対応

class UserDashboard {
  constructor() {
    this.currentUser = null;
    this.usageStats = null;
    this.selectedPlan = null;
    
    this.init();
  }

  async init() {
    try {
      // 統一セッション管理システムを使用
      await this.waitForSessionManager();
      
      // 認証状態チェック
      if (!window.sessionManager.isLoggedIn()) {
        console.log('🔒 認証されていません。ログインページにリダイレクト');
        window.location.href = '/login';
        return;
      }

      this.currentUser = window.sessionManager.getCurrentUser();
      console.log('✅ 認証済みユーザー:', this.currentUser.email);

      // イベントリスナー設定
      this.setupEventListeners();
      
      // データ読み込み
      await this.loadDashboardData();
      
      console.log('ダッシュボード初期化完了');
    } catch (error) {
      console.error('ダッシュボード初期化エラー:', error);
      this.showError('ダッシュボードの読み込みに失敗しました');
    }
  }

  // セッション管理システムの準備完了を待機
  async waitForSessionManager() {
    let attempts = 0;
    const maxAttempts = 50; // 5秒間待機
    
    while (!window.sessionManager && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!window.sessionManager) {
      throw new Error('セッション管理システムが利用できません');
    }
  }

  // ユーザー情報表示更新
  updateUserInfo(user) {
    const userInfoEl = document.getElementById('userInfo');
    if (userInfoEl) {
      const displayName = user.displayName || user.email?.split('@')[0] || 'ユーザー';
      userInfoEl.textContent = `ようこそ、${displayName}さん`;
    }
  }

  // イベントリスナー設定
  setupEventListeners() {
    // ログアウトボタン
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', this.handleLogout.bind(this));
    }

    // 画像アップロード機能
    this.setupUploadFunctionality();
    
    // カメラ機能
    this.setupCameraFunctionality();
    
    // セッション変更イベントのリスナー
    window.addEventListener('sessionChange', this.handleSessionChange.bind(this));
  }

  // セッション変更イベントハンドラー
  handleSessionChange(event) {
    const { type, user } = event.detail;
    
    if (type === 'logout') {
      console.log('🚪 ログアウト検知。ログインページにリダイレクト');
      window.location.href = '/login';
    } else if (type === 'login' && user) {
      console.log('🔐 ログイン検知。ユーザー情報更新');
      this.currentUser = user;
      this.updateUserInfo(user);
    }
  }

  // 画像アップロード機能設定
  setupUploadFunctionality() {
    const uploadCard = document.getElementById('uploadImageCard');
    const uploadModal = document.getElementById('uploadModal');
    const closeUploadModal = document.getElementById('closeUploadModal');
    const selectImageBtn = document.getElementById('selectImageBtn');
    const imageInput = document.getElementById('imageInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadArea = document.getElementById('uploadArea');
    const previewImage = document.getElementById('previewImage');

    // アップロードカードクリック
    if (uploadCard) {
      uploadCard.addEventListener('click', () => {
        if (uploadModal) uploadModal.style.display = 'block';
      });
    }

    // モーダル閉じる
    if (closeUploadModal) {
      closeUploadModal.addEventListener('click', () => {
        if (uploadModal) uploadModal.style.display = 'none';
      });
    }

    // 画像選択
    if (selectImageBtn && imageInput) {
      selectImageBtn.addEventListener('click', () => {
        imageInput.click();
      });
    }

    // 画像選択時の処理
    if (imageInput) {
      imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          this.handleImageSelection(file);
        }
      });
    }

    // 分析開始
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => {
        this.startAnalysis();
      });
    }

    // キャンセル
    if (cancelUploadBtn) {
      cancelUploadBtn.addEventListener('click', () => {
        this.resetUploadModal();
      });
    }
  }

  // 画像選択処理
  handleImageSelection(file) {
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadArea = document.getElementById('uploadArea');
    const previewImage = document.getElementById('previewImage');

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (previewImage) {
          previewImage.src = e.target.result;
        }
        if (uploadArea) uploadArea.style.display = 'none';
        if (uploadPreview) uploadPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  // 分析開始
  async startAnalysis() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput?.files[0];
    
    if (!file) {
      this.showError('画像を選択してください');
      return;
    }

    try {
      this.showLoading('分析中...');
      
      // 画像をBase64に変換
      const base64 = await this.fileToBase64(file);
      
      // 分析API呼び出し
      const response = await fetch('/api/analysis/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          image: base64,
          platform: 'instagram-post'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        this.showAnalysisResult(data.result);
      } else {
        this.showError(data.error || '分析に失敗しました');
      }
    } catch (error) {
      console.error('分析エラー:', error);
      this.showError('分析中にエラーが発生しました');
    } finally {
      this.hideLoading();
    }
  }

  // ファイルをBase64に変換
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  // 分析結果表示
  showAnalysisResult(result) {
    const modal = document.getElementById('uploadModal');
    if (modal) {
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>分析結果</h3>
            <button class="modal-close" onclick="this.closest('.modal').style.display='none'">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="analysis-result">
              <div class="score-section">
                <h4>スコア</h4>
                <div class="score">${result.score || result.grade || 'N/A'}</div>
              </div>
              <div class="analysis-section">
                <h4>分析結果</h4>
                <p>${result.analysis || '分析結果がありません'}</p>
              </div>
              ${result.improvements ? `
                <div class="improvements-section">
                  <h4>改善提案</h4>
                  <ul>
                    ${result.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" onclick="location.reload()">新しい分析</button>
              <button class="btn btn-secondary" onclick="this.closest('.modal').style.display='none'">閉じる</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // カメラ機能設定
  setupCameraFunctionality() {
    const cameraCard = document.getElementById('cameraCard');
    const cameraModal = document.getElementById('cameraModal');
    const closeCameraModal = document.getElementById('closeCameraModal');
    const captureBtn = document.getElementById('captureBtn');
    const stopCameraBtn = document.getElementById('stopCameraBtn');

    // カメラカードクリック
    if (cameraCard) {
      cameraCard.addEventListener('click', () => {
        this.startCamera();
      });
    }

    // モーダル閉じる
    if (closeCameraModal) {
      closeCameraModal.addEventListener('click', () => {
        this.stopCamera();
      });
    }

    // 撮影ボタン
    if (captureBtn) {
      captureBtn.addEventListener('click', () => {
        this.captureImage();
      });
    }

    // 停止ボタン
    if (stopCameraBtn) {
      stopCameraBtn.addEventListener('click', () => {
        this.stopCamera();
      });
    }
  }

  // カメラ開始
  async startCamera() {
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');

    if (cameraModal) cameraModal.style.display = 'block';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (cameraVideo) {
        cameraVideo.srcObject = stream;
      }
    } catch (error) {
      console.error('カメラエラー:', error);
      this.showError('カメラにアクセスできません');
    }
  }

  // カメラ停止
  stopCamera() {
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');

    if (cameraVideo && cameraVideo.srcObject) {
      const stream = cameraVideo.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      cameraVideo.srcObject = null;
    }

    if (cameraModal) cameraModal.style.display = 'none';
  }

  // 画像撮影
  captureImage() {
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');

    if (cameraVideo && cameraCanvas) {
      const context = cameraCanvas.getContext('2d');
      cameraCanvas.width = cameraVideo.videoWidth;
      cameraCanvas.height = cameraVideo.videoHeight;
      context.drawImage(cameraVideo, 0, 0);

      // CanvasからBlobを取得
      cameraCanvas.toBlob((blob) => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        this.handleImageSelection(file);
        this.stopCamera();
      }, 'image/jpeg');
    }
  }

  // ログアウト処理（統一セッション管理システム使用）
  async handleLogout() {
    try {
      await window.sessionManager.logout();
      // セッション管理システムが自動的にリダイレクトを処理
    } catch (error) {
      console.error('ログアウトエラー:', error);
      window.location.href = '/login';
    }
  }

  // ダッシュボードデータ読み込み
  async loadDashboardData() {
    try {
      // ユーザー情報表示更新
      this.updateUserInfo(this.currentUser);
      
      // デモ用の統計データ
      this.updateStats({
        totalAnalyses: 0,
        monthlyAnalyses: 0,
        planType: 'フリー',
        remainingCredits: 5
      });
    } catch (error) {
      console.error('データ読み込みエラー:', error);
    }
  }

  // 統計更新
  updateStats(stats) {
    const totalEl = document.getElementById('totalAnalyses');
    const monthlyEl = document.getElementById('monthlyAnalyses');
    const planEl = document.getElementById('planType');
    const creditsEl = document.getElementById('remainingCredits');

    if (totalEl) totalEl.textContent = stats.totalAnalyses || 0;
    if (monthlyEl) monthlyEl.textContent = stats.monthlyAnalyses || 0;
    if (planEl) planEl.textContent = stats.planType || 'フリー';
    if (creditsEl) creditsEl.textContent = stats.remainingCredits || 5;
  }

  // ローディング表示
  showLoading(message) {
    // ローディング表示の実装
    console.log('Loading:', message);
  }

  // ローディング非表示
  hideLoading() {
    // ローディング非表示の実装
    console.log('Loading finished');
  }

  // エラー表示
  showError(message) {
    console.error('Error:', message);
    alert(message);
  }

  // アップロードモーダルリセット
  resetUploadModal() {
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');

    if (uploadArea) uploadArea.style.display = 'block';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (imageInput) imageInput.value = '';
  }
}

// ページ読み込み時にダッシュボードを初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('ダッシュボード初期化開始');
  window.dashboard = new UserDashboard();
});