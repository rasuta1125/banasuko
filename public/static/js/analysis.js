// /static/js/analysis.js
(function () {
  const $ = (s) => document.querySelector(s);
  const show = (el) => el.classList.remove('hidden');
  const hide = (el) => el.classList.add('hidden');

  const abMode = $('#abMode');
  const singleUploader = $('#singleUploader');
  const abUploader = $('#abUploader');

  // プレビュー
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

  // A/B 切替
  abMode?.addEventListener('change', () => {
    if (abMode.checked) { hide(singleUploader); show(abUploader); }
    else { show(singleUploader); hide(abUploader); }
  });

  const analyzeBtn = $('#analyzeBtn');
  const state = $('#state');
  const errorBox = $('#error');
  const results = $('#resultsSection');

  // 結果DOM
  const totalScore = $('#totalScore');
  const scoreLevel = $('#scoreLevel');
  const strengthsList = $('#strengthsList');
  const improvementsList = $('#improvementsList');
  const reasoning = $('#reasoning');

  const abResults = $('#abResults');
  const winnerBadge = $('#winnerBadge');
  const scoreA = $('#scoreA'); const scoreB = $('#scoreB');
  const whyA = $('#whyA'); const whyB = $('#whyB');

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
        // 期待: { success, winner, scores:{A,B}, reasons:{A,B} }
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
        // 期待: { success, score, level, strengths[], improvements[], reasoning }
        const s = data.score ?? data.totalScore ?? data.result?.score;
        totalScore.textContent = s ?? '—';
        scoreLevel.textContent = data.level ? `評価: ${data.level}` : '';
        listify(strengthsList, data.strengths ?? data.positives ?? []);
        listify(improvementsList, data.improvements ?? data.suggestions ?? []);
        reasoning.textContent = data.reasoning ?? data.summary ?? '';
      }

      show(results);
      state.textContent = '完了';

      // 残回数の同期（任意）
      try { await fetch('/api/usage/dashboard', { credentials: 'include' }); } catch {}

    } catch (e) {
      showError(e.message || '処理に失敗しました');
      state.textContent = '失敗';
    } finally {
      analyzeBtn.disabled = false;
    }
  });
})();
