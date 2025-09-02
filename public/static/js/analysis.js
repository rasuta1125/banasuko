// /static/js/analysis.js - 既存システムを保持したUI拡張版
(function () {
  const $ = (s) => document.querySelector(s);
  const show = (el) => el.classList.remove('hidden');
  const hide = (el) => el.classList.add('hidden');

  // 既存の要素（既存システム保持）
  const abMode = $('#abMode');
  const singleUploader = $('#singleUploader');
  const abUploader = $('#abUploader');
  const analyzeBtn = $('#analyzeBtn');
  const state = $('#state');
  const errorBox = $('#error');
  const results = $('#resultsSection');

  // 既存の結果DOM（既存システム保持）
  const totalScore = $('#totalScore');
  const scoreLevel = $('#scoreLevel');
  const strengthsList = $('#strengthsList');
  const improvementsList = $('#improvementsList');
  const reasoning = $('#reasoning');
  const abResults = $('#abResults');
  const winnerBadge = $('#winnerBadge');
  const scoreA = $('#scoreA'); const scoreB = $('#scoreB');
  const whyA = $('#whyA'); const whyB = $('#whyB');

  // 新規追加要素
  let currentUser = null;
  let selectedPlatform = '';
  let scoringType = 'score';

  // 既存のプレビュー機能（既存システム保持）
  function bindPreview(input, preview) {
    input?.addEventListener('change', () => {
      const f = input.files?.[0];
      preview.innerHTML = '';
      if (!f) return;
      const img = document.createElement('img');
      img.src = URL.createObjectURL(f);
      img.className = 'rounded-md border border-cyber-purple/40 max-h-60';
      preview.appendChild(img);
    });
  }

  bindPreview($('#singleInput'), $('#singlePreview'));
  bindPreview($('#aInput'), $('#aPreview'));
  bindPreview($('#bInput'), $('#bPreview'));

  // 既存のA/B 切替（既存システム保持）
  abMode?.addEventListener('change', () => {
    if (abMode.checked) { hide(singleUploader); show(abUploader); }
    else { show(singleUploader); hide(abUploader); }
  });

  // 新規追加: 媒体変更処理
  window.handlePlatformChange = function(platform) {
    selectedPlatform = platform;
    const instagramAdType = $('#instagramAdType');
    
    if (platform === 'instagram-ad') {
      show(instagramAdType);
      scoringType = 'grade';
    } else {
      hide(instagramAdType);
      
      if (platform === 'instagram-post') {
        scoringType = 'score';
      } else if (platform === 'gdn' || platform === 'yahoo') {
        scoringType = 'grade';
      }
    }
    
    updateScoringTypeDisplay();
    console.log(`媒体変更: ${platform}, スコアタイプ: ${scoringType}`);
  };

  // 新規追加: スコアタイプ表示更新
  function updateScoringTypeDisplay() {
    const scoringInfo = $('#scoringTypeInfo');
    if (!scoringInfo) return;

    let infoText = '';
    let colorClass = '';

    switch (selectedPlatform) {
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

  // 新規追加: 分析タイプ切り替え
  window.switchAnalysisType = function(type) {
    const singleUpload = $('#singleUpload');
    const abUpload = $('#abUpload');
    const singleBtn = $('#singleBtn');
    const abBtn = $('#abBtn');

    if (type === 'single') {
      show(singleUpload);
      hide(abUpload);
      singleBtn?.classList.add('bg-cyber-purple', 'text-white');
      singleBtn?.classList.remove('bg-gray-700', 'text-gray-300');
      abBtn?.classList.add('bg-gray-700', 'text-gray-300');
      abBtn?.classList.remove('bg-cyber-green', 'text-white');
    } else if (type === 'ab') {
      hide(singleUpload);
      show(abUpload);
      abBtn?.classList.add('bg-cyber-green', 'text-white');
      abBtn?.classList.remove('bg-gray-700', 'text-gray-300');
      singleBtn?.classList.add('bg-gray-700', 'text-gray-300');
      singleBtn?.classList.remove('bg-cyber-purple', 'text-white');
    }
  };

  // 新規追加: ドラッグ&ドロップ設定
  function setupDragAndDrop() {
    // シングル分析用
    setupSingleDragAndDrop();
    // A/B分析用
    setupABDragAndDrop();
  }

  function setupSingleDragAndDrop() {
    const dropZone = $('#dropZone');
    const fileInput = $('#imageUpload');

    if (dropZone && fileInput) {
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
          handleImageUpload(files[0], 'single');
        }
      });

      dropZone.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleImageUpload(e.target.files[0], 'single');
        }
      });
    }
  }

  function setupABDragAndDrop() {
    setupABSingleDragAndDrop('A');
    setupABSingleDragAndDrop('B');
  }

  function setupABSingleDragAndDrop(pattern) {
    const dropZone = $(`#dropZone${pattern}`);
    const fileInput = $(`#imageUpload${pattern}`);

    if (dropZone && fileInput) {
      const colorClass = pattern === 'A' ? 'border-cyber-blue' : 'border-cyber-pink';
      
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add(colorClass);
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove(colorClass);
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove(colorClass);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleImageUpload(files[0], `ab${pattern}`);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleImageUpload(e.target.files[0], `ab${pattern}`);
        }
      });
    }
  }

  // 新規追加: 画像アップロード処理
  async function handleImageUpload(file, type) {
    if (file.size > 10 * 1024 * 1024) {
      showError('ファイルサイズは10MB以下にしてください');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showError('PNG, JPG, JPEG, WEBP形式のファイルをアップロードしてください');
      return;
    }

    try {
      await showImagePreview(file, type);
      console.log(`画像アップロード成功: ${type}`, file.name);
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      showError('画像のアップロードに失敗しました');
    }
  }

  // 新規追加: 画像プレビュー表示
  async function showImagePreview(file, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        let previewContainer, previewImage, imageName;
        
        switch (type) {
          case 'single':
            previewContainer = $('#imagePreview');
            previewImage = $('#previewImage');
            imageName = $('#imageName');
            break;
          case 'abA':
            previewContainer = $('#imagePreviewA');
            previewImage = $('#previewImageA');
            break;
          case 'abB':
            previewContainer = $('#imagePreviewB');
            previewImage = $('#previewImageB');
            break;
          default:
            reject(new Error('不正なアップロードタイプ'));
            return;
        }

        if (previewContainer && previewImage) {
          previewImage.src = e.target.result;
          show(previewContainer);
          
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

  // 既存の関数（既存システム保持）
  function listify(ul, items) {
    ul.innerHTML = '';
    if (!Array.isArray(items)) return;
    for (const t of items) {
      const li = document.createElement('li');
      li.textContent = typeof t === 'string' ? t : JSON.stringify(t);
      ul.appendChild(li);
    }
  }
  
  const showError = (msg) => { errorBox.textContent = msg; errorBox.classList.remove('hidden'); };
  const clearError = () => errorBox.classList.add('hidden');

  async function postForm(url, fd) {
    const res = await fetch(url, { method: 'POST', credentials: 'include', body: fd });
    if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
    return res.json();
  }

  // 既存の分析実行（既存システム保持）
  analyzeBtn?.addEventListener('click', async () => {
    clearError(); hide(results); hide(abResults);
    analyzeBtn.disabled = true;
    state.textContent = '解析中…';

    try {
      const fd = new FormData();
      fd.append('displayName', $('#displayName')?.value || '');
      fd.append('targetAge', $('#targetAge')?.value || '');
      fd.append('channel', $('#channel')?.value || '');

      if (abMode?.checked) {
        const fa = $('#aInput')?.files?.[0];
        const fb = $('#bInput')?.files?.[0];
        if (!fa || !fb) throw new Error('A/B それぞれの画像を選択してください');
        if (fa.size > 5 * 1024 * 1024 || fb.size > 5 * 1024 * 1024) throw new Error('画像は5MB以下にしてください');
        fd.append('imageA', fa); fd.append('imageB', fb);

        const data = await postForm('/api/analysis/compare', fd);
        scoreA.textContent = data?.scores?.A ?? '—';
        scoreB.textContent = data?.scores?.B ?? '—';
        whyA.textContent = data?.reasons?.A || '';
        whyB.textContent = data?.reasons?.B || '';
        winnerBadge.textContent = data?.winner || '—';
        show(abResults);

      } else {
        const f = $('#singleInput')?.files?.[0];
        if (!f) throw new Error('画像を選択してください');
        if (f.size > 5 * 1024 * 1024) throw new Error('画像は5MB以下にしてください');
        fd.append('image', f);

        const data = await postForm('/api/analysis/single', fd);
        const s = data.score ?? data.totalScore ?? data.result?.score;
        totalScore.textContent = s ?? '—';
        scoreLevel.textContent = data.level ? `評価: ${data.level}` : '';
        listify(strengthsList, data.strengths ?? data.positives ?? []);
        listify(improvementsList, data.improvements ?? data.suggestions ?? []);
        reasoning.textContent = data.reasoning ?? data.summary ?? '';
      }

      show(results);
      state.textContent = '完了';

      // 残回数の同期（既存機能保持）
      try { await fetch('/api/usage/dashboard', { credentials: 'include' }); } catch {}

    } catch (e) {
      showError(e.message || '処理に失敗しました');
      state.textContent = '失敗';
    } finally {
      analyzeBtn.disabled = false;
    }
  });

  // 初期化
  document.addEventListener('DOMContentLoaded', () => {
    console.log('分析ページ JavaScript 初期化開始');
    setupDragAndDrop();
    updateScoringTypeDisplay();
  });
})();
