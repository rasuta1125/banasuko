## 🔄 Pull Request Template

### 📋 変更カテゴリ
<!-- 該当するものにチェックを入れてください -->
- [ ] 🔧 API（/deploy/functions のみ） - ✅ **推奨**
- [ ] 🚫 UI（禁止：オーナー承認＆別PR必須） - ⚠️ **原則NG**
- [ ] 📚 ドキュメント (Documentation)

### ✅ 確認事項
<!-- 必須チェック項目 -->
- [ ] **deploy/（UI）に差分なし** - UI凍結の維持
- [ ] **API動作確認済み** - /deploy/functions の変更時
- [ ] **Firebase/認証関連** - deploy/functions 内で完結

### 📁 変更対象詳細
<!-- 該当するものにチェックを入れてください -->
- [ ] `/deploy/functions/` - API関連のみ ✅ **編集OK**
- [ ] `/functions/` - 開発用API関連 ✅ **編集OK** 
- [ ] **❌ UI関連ファイル** (/deploy/*.html, /deploy/static/, /deploy/js/) - **禁止**
- [ ] **❌ 設定ファイル** (package.json, vite.config.ts, etc.) - **オーナー承認必須**
- [ ] ドキュメント (`*.md`) ✅ **編集OK**

### 🎯 変更の概要
<!-- 何を変更したか、なぜ変更したかを簡潔に記述してください -->


### 🧪 テスト方法
<!-- 変更をテストする方法を記述してください -->
- [ ] ローカルでテスト済み
- [ ] API動作確認済み
- [ ] ブラウザでUI確認済み (UI変更の場合)

#### API テスト用コード (該当する場合)
```javascript
// テスト用のJavaScriptコードを記載
fetch('/api/analysis/single', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    options: {}
  })
}).then(r => r.json()).then(console.log);
```

### ⚠️ 注意事項
<!-- 特別な注意事項やレビュー時の確認点があれば記載 -->
- [ ] 環境変数の変更・追加なし
- [ ] 外部依存関係の変更なし
- [ ] Breaking changesなし

### 🔗 関連Issue
<!-- 関連するIssueがあれば記載 -->
Closes #

---

---

## 🛡️ UI凍結ポリシー（重要）

### ❌ **UI変更は原則禁止**
- `/deploy/*.html` - 凍結されたHTML
- `/deploy/static/` - 凍結されたアセット  
- `/deploy/js/` - 凍結されたJavaScript
- `/src/`, `/public/` - 元のソースコード
- 設定ファイル (`package.json`, `vite.config.ts`, etc.)

**💡 UI変更が必要な場合**: オーナー(@rasuta1125)承認の別PR作成

### ✅ **API変更は自由**
- `/deploy/functions/` - **メイン編集対象**
- `/functions/` - 開発用
- Firebase/認証/OpenAI - すべて /deploy/functions 内で完結

### 🚀 デプロイについて
- `deploy/`フォルダの変更 → 自動Cloudflare Pagesデプロイ
- **UI凍結**: commit `57bb1de` の状態を維持
- **API差し替え**: /deploy/functions のみ更新可能