export const HomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1a2e 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(45deg, #00f5ff, #8b5cf6, #ff6b9d)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        🎯 バナスコAI
      </h1>
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '3rem',
        color: '#a0a0a0'
      }}>
        AI-Powered Banner Analysis
        <br />
        最先端AI技術でバナー広告を詳細分析・最適化
      </p>
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <a href="/analysis" style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(45deg, #00f5ff, #8b5cf6)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          transition: 'transform 0.3s ease'
        }}>
          🚀 AI診断を開始
        </a>
        <a href="/login" style={{
          padding: '1rem 2rem',
          background: 'transparent',
          color: '#00f5ff',
          textDecoration: 'none',
          border: '2px solid #00f5ff',
          borderRadius: '50px',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}>
          👤 デモログイン
        </a>
      </div>
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'rgba(0, 245, 255, 0.1)',
        borderRadius: '15px',
        border: '1px solid rgba(0, 245, 255, 0.3)',
        display: 'inline-block'
      }}>
        <p>🎮 <strong>デモアカウント</strong></p>
        <p style={{ fontFamily: 'monospace', color: '#00f5ff' }}>
          demo@banasuko.com / demo123456
        </p>
        <p style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>
          登録不要で即座に体験可能！
        </p>
      </div>
      {/* Hero Section */}
      <section style={{ display: 'none' }} class="relative pt-20 pb-32 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center animate-slide-up">
            {/* Main Title */}
            <div class="mb-8">
              <h1 class="text-5xl md:text-7xl font-orbitron font-bold mb-6">
                <span class="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent animate-pulse-glow">
                  AI広告診断
                </span>
                <br />
                <span class="text-white">バナスコAI</span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                最先端banaAI Vision技術を活用した次世代広告分析ツール
                <br />
                <span class="text-cyber-blue font-semibold">瞬時に診断、的確に改善提案</span>
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a href="/analysis" 
                 class="group relative px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-105 hover:animate-pulse-glow">
                <i class="fas fa-chart-line mr-3"></i>
                AI診断を開始
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              
              <a href="/copy-generation" 
                 class="group relative px-8 py-4 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyber-pink/50 transition-all duration-300 transform hover:scale-105 hover:animate-pulse-glow">
                <i class="fas fa-magic mr-3"></i>
                コピー生成
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>
            
            {/* Demo Preview */}
            <div class="max-w-4xl mx-auto">
              <div class="bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl">
                <h3 class="text-2xl font-orbitron font-semibold text-cyber-blue mb-6">
                  <i class="fas fa-eye mr-3"></i>プレビュー機能
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-cyber-green">
                      <i class="fas fa-chart-bar mr-2"></i>AI分析結果
                    </h4>
                    <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-green/20">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-gray-400">総合スコア</span>
                        <span class="text-2xl font-bold text-cyber-green">82</span>
                      </div>
                      <div class="w-full bg-navy-600 rounded-full h-2">
                        <div class="bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full" style="width: 82%"></div>
                      </div>
                      <p class="text-xs text-cyber-green mt-2">優秀レベル</p>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-cyber-pink">
                      <i class="fas fa-magic mr-2"></i>生成コピー例
                    </h4>
                    <div class="bg-navy-700/50 rounded-xl p-4 border border-cyber-pink/20">
                      <p class="text-sm text-white mb-2">
                        "美肌への近道、ここにあり。今すぐ体験してください。"
                      </p>
                      <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-400">効果予測</span>
                        <span class="text-sm font-semibold text-cyber-pink">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section class="py-20 bg-navy-800/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-orbitron font-bold text-white mb-4">
              プロフェッショナル機能
            </h2>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
              AIが提供する高精度分析で、広告効果を最大化
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 hover:transform hover:scale-105 animate-float">
              <div class="w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-chart-line text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">AI広告診断</h3>
              <p class="text-gray-400 mb-4">
                5つの重要指標で広告を詳細分析。瞬間伝達力、視認性、行動喚起力など、効果に直結する要素を評価。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-cyber-blue"></i>総合スコア算出</li>
                <li><i class="fas fa-check mr-2 text-cyber-blue"></i>項目別詳細評価</li>
                <li><i class="fas fa-check mr-2 text-cyber-blue"></i>改善提案レポート</li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-200">
              <div class="w-16 h-16 bg-gradient-to-br from-cyber-green to-cyber-blue rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-balance-scale text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">A/B比較分析</h3>
              <p class="text-gray-400 mb-4">
                2つのバナーを同時比較し、統計的有意性に基づいた勝者判定。CVR改善予測も提供。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-cyber-green"></i>勝者自動判定</li>
                <li><i class="fas fa-check mr-2 text-cyber-green"></i>統計的有意性表示</li>
                <li><i class="fas fa-check mr-2 text-cyber-green"></i>効果予測レポート</li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-pink/20 hover:border-cyber-pink/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-400">
              <div class="w-16 h-16 bg-gradient-to-br from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-magic text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">AIコピー生成</h3>
              <p class="text-gray-400 mb-4">
                画像から効果的な広告コピーを自動生成。業界別最適化で、ターゲットに響くメッセージを作成。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-cyber-pink"></i>複数バリエーション生成</li>
                <li><i class="fas fa-check mr-2 text-cyber-pink"></i>業界別最適化</li>
                <li><i class="fas fa-check mr-2 text-cyber-pink"></i>効果予測スコア</li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-orange/20 hover:border-cyber-orange/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-600">
              <div class="w-16 h-16 bg-gradient-to-br from-cyber-orange to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-industry text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">業界別最適化</h3>
              <p class="text-gray-400 mb-4">
                美容、飲食、不動産など、業界特性を考慮した専門的な分析とアドバイスを提供。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-cyber-orange"></i>業界特化分析</li>
                <li><i class="fas fa-check mr-2 text-cyber-orange"></i>競合ベンチマーク</li>
                <li><i class="fas fa-check mr-2 text-cyber-orange"></i>薬機法チェック</li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-800">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-mobile-alt text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">媒体別最適化</h3>
              <p class="text-gray-400 mb-4">
                Instagram、GDN、YDNなど、各媒体の特性に合わせた最適化提案を実施。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-purple-500"></i>媒体特化アドバイス</li>
                <li><i class="fas fa-check mr-2 text-purple-500"></i>サイズ最適化</li>
                <li><i class="fas fa-check mr-2 text-purple-500"></i>表示環境考慮</li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div class="group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-1000">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                <i class="fas fa-chart-area text-2xl text-white"></i>
              </div>
              <h3 class="text-xl font-semibold text-white mb-4">効果予測レポート</h3>
              <p class="text-gray-400 mb-4">
                クリック率、コンバージョン率、ROI改善など、具体的な数値で効果を予測。
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li><i class="fas fa-check mr-2 text-teal-500"></i>CTR予測</li>
                <li><i class="fas fa-check mr-2 text-teal-500"></i>CVR改善試算</li>
                <li><i class="fas fa-check mr-2 text-teal-500"></i>ROI分析</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-orbitron font-bold text-white mb-4">
              プロフェッショナル実績
            </h2>
            <p class="text-xl text-gray-300">AIが支援する広告改善の成果</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all duration-300">
                <div class="text-4xl font-orbitron font-bold text-cyber-blue mb-2">92%</div>
                <p class="text-gray-300">分析精度</p>
              </div>
            </div>
            
            <div class="text-center group">
              <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-green/20 group-hover:border-cyber-green/50 transition-all duration-300">
                <div class="text-4xl font-orbitron font-bold text-cyber-green mb-2">+28%</div>
                <p class="text-gray-300">平均CVR改善</p>
              </div>
            </div>
            
            <div class="text-center group">
              <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-pink/20 group-hover:border-cyber-pink/50 transition-all duration-300">
                <div class="text-4xl font-orbitron font-bold text-cyber-pink mb-2">3.2秒</div>
                <p class="text-gray-300">分析完了時間</p>
              </div>
            </div>
            
            <div class="text-center group">
              <div class="bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-orange/20 group-hover:border-cyber-orange/50 transition-all duration-300">
                <div class="text-4xl font-orbitron font-bold text-cyber-orange mb-2">5+</div>
                <p class="text-gray-300">対応業界</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-navy-800/50 to-navy-700/50">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-4xl font-orbitron font-bold text-white mb-6">
            今すぐAI診断を体験
          </h2>
          <p class="text-xl text-gray-300 mb-8">
            デモアカウントでお試しいただけます。登録不要で即座に体験可能。
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/analysis" 
               class="group relative px-10 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-110 hover:animate-pulse-glow">
              <i class="fas fa-rocket mr-3"></i>
              AI診断を開始
            </a>
            
            <a href="/login" 
               class="group relative px-10 py-4 bg-transparent border-2 border-cyber-blue rounded-full text-cyber-blue font-bold text-lg hover:bg-cyber-blue hover:text-white transition-all duration-300 transform hover:scale-105">
              <i class="fas fa-user mr-3"></i>
              デモログイン
            </a>
          </div>
          
          <div class="mt-8 text-sm text-gray-400">
            <p>デモアカウント: <span class="text-cyber-blue font-mono">demo</span> / <span class="text-cyber-blue font-mono">demo123</span></p>
          </div>
        </div>
      </section>
    </div>
  )
}