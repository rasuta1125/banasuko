export const SimpleHomePage = () => {
  return (
    <div>
      <style>{`
        body {
          background: linear-gradient(135deg, #0a0f1c 0%, #1a1a2e 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }
        .hero {
          text-align: center;
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #00f5ff, #8b5cf6, #ff6b9d);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glow 2s ease-in-out infinite alternate;
        }
        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 40px;
          color: #a0a0a0;
        }
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .btn {
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn-primary {
          background: linear-gradient(45deg, #00f5ff, #8b5cf6);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 245, 255, 0.5);
        }
        .btn-secondary {
          background: transparent;
          color: #00f5ff;
          border: 2px solid #00f5ff;
        }
        .btn-secondary:hover {
          background: #00f5ff;
          color: #0a0f1c;
          transform: translateY(-2px);
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          padding: 0 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feature-card {
          background: rgba(26, 26, 46, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(0, 245, 255, 0.2);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 245, 255, 0.5);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.2);
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #00f5ff, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .feature-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: white;
        }
        .feature-desc {
          color: #a0a0a0;
          line-height: 1.6;
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 5px #00f5ff); }
          100% { filter: drop-shadow(0 0 20px #8b5cf6); }
        }
        .demo-info {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          background: rgba(0, 245, 255, 0.1);
          border-radius: 15px;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }
        .demo-info code {
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 10px;
          border-radius: 5px;
          color: #00f5ff;
          font-family: monospace;
        }
      `}</style>
      
      <div className="hero">
        <h1 className="title">🎯 バナスコAI</h1>
        <p className="subtitle">AI-Powered Banner Analysis<br />最先端AI技術でバナー広告を詳細分析・最適化</p>
        
        <div className="cta-buttons">
          <a href="/analysis" className="btn btn-primary">
            🚀 AI診断を開始
          </a>
          <a href="/login" className="btn btn-secondary">
            👤 デモログイン
          </a>
        </div>
        
        <div className="demo-info">
          <p>🎮 <strong>デモアカウント</strong>: <code>demo@banasuko.com</code> / <code>demo123456</code></p>
          <p>登録不要で即座に体験可能！</p>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">AI画像分析</h3>
          <p className="feature-desc">
            最新のGPT-4 Vision技術でバナーの視覚的魅力、文字の可読性、配色バランスを詳細分析
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚖️</div>
          <h3 className="feature-title">A/B比較分析</h3>
          <p className="feature-desc">
            2つのバナーを同時比較し、統計的有意性に基づいた勝者判定とCVR改善予測を提供
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3 className="feature-title">AIコピー生成</h3>
          <p className="feature-desc">
            画像から効果的な広告コピーを自動生成。業界別最適化でターゲットに響くメッセージを作成
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🏭</div>
          <h3 className="feature-title">業界別最適化</h3>
          <p className="feature-desc">
            美容、飲食、不動産など業界特性を考慮した専門的な分析とアドバイスを提供
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3 className="feature-title">媒体別最適化</h3>
          <p className="feature-desc">
            Instagram、GDN、YDNなど各媒体の特性に合わせた最適化提案を実施
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">効果予測レポート</h3>
          <p className="feature-desc">
            クリック率、コンバージョン率、ROI改善など具体的な数値で効果を予測
          </p>
        </div>
      </div>
    </div>
  )
}