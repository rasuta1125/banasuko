#!/bin/bash

# バナスコAI - Cloudflare Pages デプロイスクリプト
# 使用方法: ./deploy.sh

echo "🚀 バナスコAI - Cloudflare Pages デプロイ開始"

# deployディレクトリの存在確認
if [ ! -d "deploy" ]; then
    echo "❌ deployディレクトリが見つかりません"
    exit 1
fi

# ZIPファイル作成
echo "📦 デプロイファイルをパッケージ化中..."
cd deploy
zip -r ../banasuko-deploy.zip . -x "*.DS_Store" "*.git*"
cd ..

echo "✅ banasuko-deploy.zip を作成しました"
echo "📁 ファイルサイズ: $(du -h banasuko-deploy.zip | cut -f1)"

echo ""
echo "🔧 手動デプロイ手順:"
echo "1. https://dash.cloudflare.com/pages に移動"
echo "2. banasuko プロジェクトを選択"
echo "3. 'Upload assets' をクリック"
echo "4. banasuko-deploy.zip をアップロード"
echo ""
echo "または wrangler を使用:"
echo "export CLOUDFLARE_API_TOKEN=your_api_token"
echo "wrangler pages deploy deploy --project-name=banasuko"

echo ""
echo "🌐 期待されるURL: https://banasuko.pages.dev"
echo "⏰ デプロイ完了まで約2-3分"