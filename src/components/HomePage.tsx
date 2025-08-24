export const HomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #1a1a2e 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(45deg, #00f5ff, #8b5cf6, #ff6b9d)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
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
        最先端AI技術でバナー広告を詳細分析
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '3rem'
      }}>
        <a href="/analysis" style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(45deg, #00f5ff, #8b5cf6)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '1.1rem'
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
          fontSize: '1.1rem'
        }}>
          👤 ログイン
        </a>
      </div>
      
      <div style={{
        background: 'rgba(0, 245, 255, 0.1)',
        border: '1px solid rgba(0, 245, 255, 0.3)',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3 style={{ color: '#00f5ff', marginBottom: '1rem' }}>
          🎮 デモアカウント
        </h3>
        <p style={{ fontFamily: 'monospace', color: '#00f5ff', fontSize: '1.2rem' }}>
          demo@banasuko.com / demo123456
        </p>
        <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>
          登録不要で即座に体験可能！
        </p>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ color: '#8b5cf6', marginBottom: '2rem' }}>主要機能</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            borderRadius: '15px',
            border: '1px solid rgba(0, 245, 255, 0.2)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: '#00f5ff', marginBottom: '1rem' }}>AI画像分析</h3>
            <p style={{ color: '#a0a0a0' }}>最新GPT-4 Vision技術でバナーを詳細分析</p>
          </div>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            borderRadius: '15px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚖️</div>
            <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>A/B比較分析</h3>
            <p style={{ color: '#a0a0a0' }}>統計的有意性に基づいた勝者判定</p>
          </div>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            borderRadius: '15px',
            border: '1px solid rgba(255, 107, 157, 0.2)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
            <h3 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>AIコピー生成</h3>
            <p style={{ color: '#a0a0a0' }}>効果的な広告コピーを自動生成</p>
          </div>
        </div>
      </div>
    </div>
  )
}