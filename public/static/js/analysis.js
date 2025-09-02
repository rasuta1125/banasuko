// /static/js/analysis.js
(function () {
  const form = document.getElementById('analyzeForm');
  if (!form) return;

  const btn = document.getElementById('analyzeBtn');
  const state = document.getElementById('analyzeState');
  const err = document.getElementById('analyzeError');
  const result = document.getElementById('analyzeResult');
  const scoreValue = document.getElementById('scoreValue');
  const scoreLevel = document.getElementById('scoreLevel');
  const scoreReason = document.getElementById('scoreReason');
  const strengthsList = document.getElementById('strengthsList');
  const improvementsList = document.getElementById('improvementsList');
  const input = document.getElementById('imageInput');

  const showError = (msg) => { err.textContent = msg; err.style.display = 'block'; };
  const hideError = () => { err.style.display = 'none'; };

  const listify = (ul, items) => {
    ul.innerHTML = '';
    if (!Array.isArray(items)) return;
    for (const it of items) {
      const li = document.createElement('li');
      li.textContent = typeof it === 'string' ? it : JSON.stringify(it);
      ul.appendChild(li);
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    result.style.display = 'none';
    btn.disabled = true;
    state.textContent = '採点中…（画像を解析しています）';

    try {
      const file = input.files?.[0];
      if (!file) throw new Error('画像ファイルを選択してください');
      if (file.size > 5 * 1024 * 1024) throw new Error('5MB 以下の画像を選んでください');

      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch('/api/analysis/single', {
        method: 'POST',
        credentials: 'include',
        body: fd
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`採点に失敗しました (${res.status}) ${text || ''}`);
      }

      const data = await res.json();
      // 想定されるレスポンスのバリエーションに耐える
      const score = data.score ?? data.totalScore ?? data.result?.score ?? null;
      const level = data.level ?? data.grade ?? '';
      const reasoning = data.reasoning ?? data.summary ?? data.explanation ?? '';
      const strengths = data.strengths ?? data.positives ?? [];
      const improvements = data.improvements ?? data.suggestions ?? data.negatives ?? [];

      if (score == null) throw new Error('採点スコアが取得できませんでした');

      scoreValue.textContent = String(score);
      scoreLevel.textContent = level ? `評価: ${level}` : '';
      scoreReason.textContent = reasoning || '(理由の記載はありません)';

      listify(strengthsList, strengths);
      listify(improvementsList, improvements);

      result.style.display = 'block';
      state.textContent = '完了';

      // 使用回数UIを持っている場合はここで更新
      // try {
      //   const usageRes = await fetch('/api/usage/dashboard', { credentials: 'include' });
      //   const usage = await usageRes.json();
      //   updateUsageUI?.(usage); // ダッシュボード側の関数があれば呼ぶ
      // } catch {}

    } catch (e2) {
      showError(e2.message || '不明なエラー');
      state.textContent = '失敗';
    } finally {
      btn.disabled = false;
    }
  });
})();
