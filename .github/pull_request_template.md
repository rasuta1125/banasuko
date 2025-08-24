## 変更カテゴリ
- [x] API（/deploy/functions のみ）
- [ ] UI（禁止：オーナー承認＆別PR）

## チェック
- [x] deploy/（UI）に不要な差分はない
- [x] _routes.json は { "include": ["/api/*"] } になっている
- [x] Functions のログ出力で秘密情報を含めていない

## テスト用コード（API変更時）
```javascript
fetch('/api/analysis/single', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    options: {}
  })
}).then(r => r.json()).then(console.log).catch(console.error);
```