# バナスコAI デプロイメントガイド

## 🚀 Cloudflare Pages デプロイメント手順

### 1. 前提条件
- Cloudflareアカウント（既存）
- Cloudflare APIトークン（Pages:Edit権限）
- OpenAI APIキー（GPT-4o Vision API利用）

### 2. 環境変数の設定

#### Cloudflare Dashboard で設定する環境変数:
```
OPENAI_API_KEY=sk-your-openai-api-key-here
PING=ok
```

### 3. デプロイコマンド

#### 方法1: ローカルデプロイ（APIトークン設定後）
```bash
# APIトークンを設定
export CLOUDFLARE_API_TOKEN=your-api-token-here

# プロダクションデプロイ
npm run deploy:prod

# プレビューデプロイ
npm run deploy:preview
```

#### 方法2: GitHub Actions自動デプロイ（推奨）
1. GitHubリポジトリの Settings > Secrets にAPIトークンを設定
2. pushまたはPRで自動デプロイ

### 4. プロジェクト設定

#### wrangler.toml 設定
```toml
name = "banasco-ai"
compatibility_date = "2025-08-21"
pages_build_output_dir = "./dist"
compatibility_flags = ["nodejs_compat"]
```

#### 手動でプロジェクト作成する場合:
```bash
wrangler pages project create banasco-ai
```

### 5. 本番URL
デプロイ成功後のURL: `https://banasco-ai.pages.dev`

### 6. カスタムドメイン設定（オプション）
Cloudflare Dashboard > Pages > banasco-ai > Custom domains で設定

### 7. 監視とログ
- Cloudflare Analytics: Real User Monitoring
- Worker Analytics: Performance metrics
- Logs: `wrangler pages deployment tail --project-name banasco-ai`

## 🔧 トラブルシューティング

### よくある問題と解決方法

1. **API Token エラー**
   - Cloudflare Dashboard > My Profile > API Tokens でPages:Edit権限のトークンを作成

2. **環境変数が読み込まれない**
   - Cloudflare Dashboard > Pages > banasco-ai > Settings > Environment variables で設定
   - デプロイ後に環境変数を追加した場合は再デプロイが必要

3. **OpenAI API エラー**
   - APIキーの権限確認（GPT-4o Vision API利用可能か）
   - 使用量制限の確認

4. **Firebase接続エラー**
   - Firebase プロジェクトの認証設定確認
   - セキュリティルールの確認

## 📊 パフォーマンス最適化

### 推奨設定
- Cache Control: `max-age=31536000` for static assets
- Compression: Brotli/Gzip enabled
- HTTP/2 Push: Critical resources

### 監視メトリクス
- Page Load Time: < 2s
- Time to Interactive: < 3s
- Core Web Vitals: Good

## 🔒 セキュリティ設定

### HTTPS/SSL
- Always Use HTTPS: Enabled
- TLS 1.3: Enabled
- HSTS: Max-Age 31536000

### API Security
- Rate Limiting: 1000 req/min per IP
- Authentication: JWT with 7-day expiration
- CORS: Restricted to frontend domain

## 🎯 デプロイメント完了確認

1. ✅ サイトアクセス確認
2. ✅ AI機能動作確認（画像解析）
3. ✅ 認証機能確認
4. ✅ 管理者機能確認
5. ✅ データベース接続確認

デプロイメント成功時のチェックリスト完了で本番稼働開始！