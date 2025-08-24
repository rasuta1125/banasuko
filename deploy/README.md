# 🚀 Deploy Directory - UI凍結 & API差し替え運用

## 📁 ディレクトリ構造

```
deploy/
├── README.md              # このファイル
├── 404.html              # 凍結されたUI (変更禁止)
├── _redirects            # 凍結されたリダイレクト設定 (変更禁止)
├── _routes.json          # 凍結されたルート設定 (変更禁止)
├── _worker.js            # 凍結されたワーカー (変更禁止)
├── js/                   # 凍結されたJavaScript (変更禁止)
├── static/               # 凍結されたアセット (変更禁止)
└── functions/            # API関数 (変更可能)
    └── api/
        ├── analysis/
        │   ├── single.ts    # ✅ 変更可能
        │   └── compare.ts   # ✅ 変更可能
        ├── auth/           # ✅ 変更可能
        ├── user/           # ✅ 変更可能
        └── ...
```

## 🛡️ UI Protection Policy

### ❌ 変更禁止 (UI凍結)
- `*.html` - HTMLファイル
- `js/` - JavaScriptバンドル
- `static/` - 静的アセット (CSS, images, etc.)
- `_worker.js` - Cloudflare Worker
- `_routes.json`, `_redirects` - ルーティング設定

**理由**: デザイン崩れ防止のため、UIは完全に凍結されています。

### ✅ 変更可能 (API差し替え)
- `functions/` - すべてのAPI関数
- Firebase認証関連
- OpenAI API呼び出し
- データベース操作

## 🔄 開発ワークフロー

### API修正の場合
1. `deploy/functions/` 内のファイルを直接編集
2. PRを作成（オーナー承認不要）
3. マージすると自動デプロイ

### UI修正が必要な場合
1. **オーナー承認必須** - @rasuta1125 に相談
2. 元の `src/` を修正してビルド
3. `deploy/` を完全に置き換え
4. PRでオーナー承認を得る

## 🚀 デプロイ

### 自動デプロイ
- `deploy/` フォルダの変更で自動的にトリガー
- GitHub Actions が `wrangler pages deploy deploy/` を実行
- 本番: `https://banasuko.pages.dev`
- プレビュー: `https://banasuko-{PR番号}.pages.dev`

### 必要なシークレット
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 🧪 API テスト

```javascript
// 単一画像分析API
fetch('https://banasuko.pages.dev/api/analysis/single', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    options: {}
  })
}).then(r => r.json()).then(console.log).catch(console.error);
```

## 📋 ルール

1. **UIに触らない**: `/deploy/functions/` のみ編集
2. **API自由**: 認証・Firebase・OpenAI等は自由に修正可能
3. **テスト必須**: 変更後は必ずAPI動作確認
4. **環境変数**: Cloudflare Dashboard で設定
   - `OPENAI_API_KEY`
   - `FIREBASE_*` (必要に応じて)

---

**🔒 このディレクトリはプロダクション環境に直接デプロイされます。慎重に変更してください。**