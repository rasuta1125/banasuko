import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>バナスコAI - AI広告診断ツール</title>
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Font Awesome */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    'orbitron': ['Orbitron', 'monospace'],
                    'noto': ['Noto Sans JP', 'sans-serif']
                  },
                  colors: {
                    'cyber-blue': '#00f5ff',
                    'cyber-purple': '#8b5cf6',
                    'cyber-pink': '#ff6b9d',
                    'cyber-green': '#00ff88',
                    'cyber-orange': '#ff8c00',
                    'navy': {
                      900: '#0a0a1f',
                      800: '#1a1a2e',
                      700: '#16213e',
                      600: '#2d3561',
                      500: '#4682b4'
                    }
                  },
                  animation: {
                    'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
                    'float': 'float 3s ease-in-out infinite',
                    'slide-up': 'slide-up 0.5s ease-out',
                    'fade-in': 'fade-in 0.3s ease-out'
                  },
                  keyframes: {
                    'pulse-glow': {
                      'from': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
                      'to': { boxShadow: '0 0 30px rgba(0, 245, 255, 0.8)' }
                    },
                    'float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' }
                    },
                    'slide-up': {
                      'from': { transform: 'translateY(20px)', opacity: '0' },
                      'to': { transform: 'translateY(0)', opacity: '1' }
                    },
                    'fade-in': {
                      'from': { opacity: '0' },
                      'to': { opacity: '1' }
                    }
                  }
                }
              }
            }
          `
        }} />
        
        {/* Meta Tags for SEO */}
        <meta name="description" content="AI広告診断ツール バナスコAI - バナー広告の効果を瞬時に分析し、改善提案を行うプロフェッショナルツール" />
        <meta name="keywords" content="AI, 広告分析, バナー診断, マーケティング, 広告効果測定" />
        <meta name="author" content="バナスコAI" />
        
        {/* Open Graph */}
        <meta property="og:title" content="バナスコAI - AI広告診断ツール" />
        <meta property="og:description" content="AIがバナー広告を詳細分析し、効果予測と改善提案を提供" />
        <meta property="og:type" content="website" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </head>
      
      <body class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 min-h-screen text-white font-noto">
        {/* Background Effects */}
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyber-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyber-purple/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Navigation */}
        <nav class="relative z-50 bg-navy-900/80 backdrop-blur-lg border-b border-cyber-blue/20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              {/* Logo */}
              <div class="flex items-center">
                <a href="/" class="flex items-center space-x-3 group">
                  <div class="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                    <i class="fas fa-chart-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h1 class="text-xl font-orbitron font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                      バナスコAI
                    </h1>
                  </div>
                </a>
              </div>
              
              {/* Navigation Links */}
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-8">
                  <a href="/" class="nav-link text-gray-300 hover:text-cyber-blue px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                    <i class="fas fa-home mr-2"></i>ホーム
                  </a>
                  <a href="/analysis" class="nav-link text-gray-300 hover:text-cyber-green px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                    <i class="fas fa-chart-bar mr-2"></i>AI診断
                  </a>
                  <a href="/copy-generation" class="nav-link text-gray-300 hover:text-cyber-pink px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                    <i class="fas fa-magic mr-2"></i>コピー生成
                  </a>
                  <a href="/login" class="nav-link text-gray-300 hover:text-cyber-orange px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                    <i class="fas fa-sign-in-alt mr-2"></i>ログイン
                  </a>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div class="md:hidden">
                <button id="mobile-menu-btn" class="text-gray-400 hover:text-white focus:outline-none focus:text-white">
                  <i class="fas fa-bars text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div id="mobile-menu" class="hidden md:hidden bg-navy-800/95 backdrop-blur-lg border-t border-cyber-blue/20">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="/" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-blue transition-colors">
                <i class="fas fa-home mr-2"></i>ホーム
              </a>
              <a href="/analysis" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-green transition-colors">
                <i class="fas fa-chart-bar mr-2"></i>AI診断
              </a>
              <a href="/copy-generation" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-pink transition-colors">
                <i class="fas fa-magic mr-2"></i>コピー生成
              </a>
              <a href="/login" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-orange transition-colors">
                <i class="fas fa-sign-in-alt mr-2"></i>ログイン
              </a>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main class="relative z-10">
          {children}
        </main>
        
        {/* Footer */}
        <footer class="relative z-10 bg-navy-900/50 backdrop-blur-lg border-t border-cyber-blue/10 mt-20">
          <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 class="text-lg font-orbitron font-semibold text-cyber-blue mb-4">バナスコAI</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  AI技術を活用したプロフェッショナル広告分析ツール。バナー広告の効果を瞬時に診断し、データに基づいた改善提案を提供します。
                </p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-cyber-green mb-4">機能</h3>
                <ul class="text-gray-400 text-sm space-y-2">
                  <li><i class="fas fa-check mr-2 text-cyber-green"></i>AI広告診断</li>
                  <li><i class="fas fa-check mr-2 text-cyber-green"></i>A/B比較分析</li>
                  <li><i class="fas fa-check mr-2 text-cyber-green"></i>コピー自動生成</li>
                  <li><i class="fas fa-check mr-2 text-cyber-green"></i>効果予測レポート</li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-cyber-pink mb-4">技術スタック</h3>
                <ul class="text-gray-400 text-sm space-y-2">
                  <li><i class="fas fa-code mr-2 text-cyber-pink"></i>Hono Framework</li>
                  <li><i class="fas fa-cloud mr-2 text-cyber-pink"></i>Cloudflare Pages</li>
                  <li><i class="fas fa-robot mr-2 text-cyber-pink"></i>OpenAI GPT-4o Vision</li>
                  <li><i class="fas fa-mobile-alt mr-2 text-cyber-pink"></i>レスポンシブデザイン</li>
                </ul>
              </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-700 text-center">
              <p class="text-gray-400 text-sm">
                © 2024 バナスコAI. All rights reserved. | AI-Powered Banner Analysis Engine
              </p>
            </div>
          </div>
        </footer>
        
        {/* JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})