#!/usr/bin/env node

// バナスコAI - 静的HTML生成スクリプト
// Cloudflare Pages用の静的ファイル生成

const fs = require('fs').promises;
const path = require('path');

// HTMLテンプレート
const htmlTemplate = (title, content, additionalCSS = '', additionalJS = '') => `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'navy': {
                            800: '#1e293b',
                            700: '#334155'
                        },
                        'cyber-blue': '#00bcd4',
                        'cyber-purple': '#9c27b0',
                        'cyber-pink': '#e91e63',
                        'cyber-orange': '#ff9800',
                        'cyber-green': '#4caf50'
                    },
                    fontFamily: {
                        'orbitron': ['Orbitron', 'monospace']
                    }
                }
            }
        }
    </script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/static/style.css">
    ${additionalCSS}
    
    <style>
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 188, 212, 0.3); }
            50% { box-shadow: 0 0 30px rgba(0, 188, 212, 0.6); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        
        body { 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            min-height: 100vh;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen">
    ${content}
    
    <!-- Custom JavaScript -->
    <script src="/static/app.js"></script>
    ${additionalJS}
</body>
</html>`;

// ページ生成関数
const generatePages = async () => {
    const distDir = path.join(__dirname, '..', 'dist');
    
    try {
        // distディレクトリ作成
        await fs.mkdir(distDir, { recursive: true });
        
        // ホームページ生成
        const homeHTML = htmlTemplate(
            'バナスコAI - AI広告診断ツール',
            `
            <!-- ナビゲーション -->
            <nav class="fixed top-0 left-0 right-0 z-50 bg-navy-800/80 backdrop-blur-lg border-b border-gray-700/50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <span class="text-2xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                                    バナスコAI
                                </span>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <a href="/" class="text-white hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">ホーム</a>
                                <a href="/analysis" class="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">分析</a>
                                <a href="/login" class="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-cyan-500 transition-all">ログイン</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- メインコンテンツ -->
            <main class="pt-16">
                <!-- ヒーローセクション -->
                <section class="relative overflow-hidden py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center">
                            <h1 class="text-4xl md:text-6xl font-orbitron font-bold mb-6 animate-slide-up">
                                <span class="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    最先端banaAI Vision技術
                                </span>
                            </h1>
                            <p class="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
                                AI画像解析で広告バナーの効果を科学的に診断・改善提案
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                                <a href="/login" class="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                                    今すぐ始める
                                </a>
                                <a href="#features" class="border-2 border-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                                    機能を見る
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 機能セクション -->
                <section id="features" class="py-20 bg-navy-800/30">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                                <span class="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                                    主要機能
                                </span>
                            </h2>
                            <p class="text-xl text-gray-300">banaAI搭載の高精度分析ツール</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <!-- 機能1 -->
                            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                                <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                                    <i class="fas fa-chart-line text-2xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold mb-4 text-cyan-400">AI診断分析</h3>
                                <p class="text-gray-300">最先端banaAI Vision技術による詳細な広告効果分析とスコアリング</p>
                            </div>
                            
                            <!-- 機能2 -->
                            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                                    <i class="fas fa-balance-scale text-2xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold mb-4 text-purple-400">A/B比較分析</h3>
                                <p class="text-gray-300">2つのバナーを統計的に比較し、優劣を科学的に判定</p>
                            </div>
                            
                            <!-- 機能3 -->
                            <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
                                <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
                                    <i class="fas fa-magic text-2xl text-white"></i>
                                </div>
                                <h3 class="text-xl font-bold mb-4 text-pink-400">AIコピー生成</h3>
                                <p class="text-gray-300">効果的な広告コピーを4つのタイプで自動生成</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            `
        );
        
        // ログインページ生成
        const loginHTML = htmlTemplate(
            'ログイン - バナスコAI',
            `
            <div class="min-h-screen pt-20 pb-20">
                <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl animate-slide-up">
                        <!-- Header -->
                        <div class="text-center mb-8">
                            <div class="w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                                <i class="fas fa-user-circle text-3xl text-white"></i>
                            </div>
                            <h1 class="text-3xl font-orbitron font-bold text-white mb-2">ログイン</h1>
                            <p class="text-gray-400">バナスコAIにアクセス</p>
                        </div>
                        
                        <!-- メッセージ表示 -->
                        <div class="text-center mb-6">
                            <p class="text-yellow-400 text-sm">⚠️ この静的ページではログイン機能は利用できません</p>
                            <p class="text-cyan-400 text-sm mt-2">フル機能版は開発サーバーでご利用ください</p>
                        </div>
                        
                        <!-- Demo Login Info -->
                        <div class="bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl p-6 mb-6">
                            <h3 class="text-lg font-semibold text-cyber-blue mb-3">
                                <i class="fas fa-rocket mr-2"></i>デモアカウント情報
                            </h3>
                            <div class="bg-navy-700/50 rounded-lg p-4 mb-4">
                                <div class="grid grid-cols-1 gap-2 text-sm">
                                    <div>
                                        <span class="text-gray-400">メールアドレス:</span>
                                        <div class="text-cyber-blue font-mono font-semibold">demo@banasuko.com</div>
                                    </div>
                                    <div>
                                        <span class="text-gray-400">パスワード:</span>
                                        <div class="text-cyber-blue font-mono font-semibold">demo123</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Features Info -->
                        <div class="bg-navy-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6">
                            <h3 class="text-lg font-semibold text-white mb-4 text-center">
                                <i class="fas fa-star mr-2 text-cyber-blue"></i>利用可能機能
                            </h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex items-center text-gray-300">
                                    <i class="fas fa-chart-line mr-3 text-cyber-blue w-4"></i>
                                    <span>banaAI画像診断 - 詳細分析とスコアリング</span>
                                </div>
                                <div class="flex items-center text-gray-300">
                                    <i class="fas fa-balance-scale mr-3 text-cyber-green w-4"></i>
                                    <span>A/B比較分析 - 統計的有意性に基づく判定</span>
                                </div>
                                <div class="flex items-center text-gray-300">
                                    <i class="fas fa-magic mr-3 text-cyber-pink w-4"></i>
                                    <span>AIコピー生成 - 効果的な広告文の自動生成</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
            '',
            '<script src="/static/js/auth.js"></script>'
        );

        // 404ページ生成
        const notFoundHTML = htmlTemplate(
            '404 - ページが見つかりません | バナスコAI',
            `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <div class="w-32 h-32 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                        <i class="fas fa-exclamation-triangle text-4xl text-white"></i>
                    </div>
                    <h1 class="text-6xl font-orbitron font-bold text-white mb-4">404</h1>
                    <p class="text-xl text-gray-300 mb-8">ページが見つかりません</p>
                    <a href="/" class="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105">
                        ホームに戻る
                    </a>
                </div>
            </div>
            `
        );

        // ファイル書き込み
        await fs.writeFile(path.join(distDir, 'index.html'), homeHTML);
        await fs.writeFile(path.join(distDir, 'login.html'), loginHTML);
        await fs.writeFile(path.join(distDir, '404.html'), notFoundHTML);
        
        console.log('\n✅ 静的HTMLファイル生成完了:');
        console.log('  - index.html (ホームページ)');
        console.log('  - login.html (ログインページ)');
        console.log('  - 404.html (エラーページ)');
        
    } catch (error) {
        console.error('❌ 静的ファイル生成エラー:', error);
        process.exit(1);
    }
};

generatePages();