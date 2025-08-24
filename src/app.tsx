// メインアプリケーション - SSRレンダリング専用
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { jwtVerify, createRemoteJWKSet } from 'jose'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
}

import { renderer } from './renderer'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import { AnalysisPage } from './components/AnalysisPage'
import { CopyGenerationPage } from './components/CopyGenerationPage'
import { AdminDashboard } from './components/AdminDashboard'
import { UserDashboard } from './components/UserDashboard'
import { PlanManagement } from './components/PlanManagement'

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('/api/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './public' }))

// ========== API エンドポイント（SSRより先に定義） ==========

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

// Firebase セッション作成エンドポイント
app.post('/api/session', async (c) => {
  console.log('🔥 Firebase session endpoint called')
  
  try {
    // body 安全に取得
    let idToken: string | undefined;
    try {
      const body = await c.req.json();
      idToken = body?.idToken;
      console.log('📨 Received idToken:', idToken ? idToken.substring(0, 20) + '...' : 'none')
    } catch (e) {
      console.error('❌ JSON parsing error:', e)
      return c.json({ ok: false, message: 'Invalid JSON body' }, 400);
    }
    
    if (!idToken) {
      console.log('❌ No idToken provided')
      return c.json({ ok: false, message: 'idToken required' }, 400);
    }

    const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';
    console.log('🔧 Using Firebase project:', projectId)
    
    // Firebase IDトークンを検証
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    console.log('✅ Token verified successfully for user:', payload.user_id)

    // セッションクッキーを発行
    c.header('Set-Cookie',
      `bn_session=uid:${payload.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return c.json({
      ok: true,
      uid: payload.user_id,
      email: payload.email ?? null,
      message: 'Session created successfully'
    });
  } catch (e: any) {
    console.error('💥 Token verification error:', e);
    return c.json({ 
      ok: false, 
      message: e?.message || 'Invalid token',
      error: e.toString()
    }, 401);
  }
});

// CORS OPTIONS handler
app.options('/api/session', (c) => {
  return c.body(null, 204);
});

// API ステータスエンドポイント
app.get('/api/status', async (c) => {
  const k = c.env.OPENAI_API_KEY
  const ping = c.env.PING
  const envKeysCount = Object.keys(c.env || {}).length

  return c.json({
    success: true,
    status: {
      openai_configured: Boolean(k),
      key_prefix: k ? k.slice(0, 3) + '...' : 'undefined...',
      ping_seen: ping === 'ok',
      env_keys_count: envKeysCount,
      environment: 'pages',
      cloudflare_context: true,
      timestamp: new Date().toISOString()
    }
  })
})

// ========== SSR レンダリング（APIの後に定義） ==========

// レンダラー設定
app.use(renderer)

// ページルート設定
app.get('/', (c) => {
  return c.render(<HomePage />)
})

app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

app.get('/analysis', (c) => {
  return c.render(<AnalysisPage />)
})

app.get('/copy-generation', (c) => {
  return c.render(<CopyGenerationPage />)
})

app.get('/admin', (c) => {
  return c.render(<AdminDashboard />)
})

app.get('/dashboard', (c) => {
  return c.render(<UserDashboard />)
})

app.get('/plan', (c) => {
  return c.render(<PlanManagement />)
})

// 404ハンドリング
app.notFound((c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-cyber-blue mb-4">404</h1>
        <p class="text-xl text-gray-300 mb-8">ページが見つかりません</p>
        <a href="/" class="btn btn-primary">
          <i class="fas fa-home mr-2"></i>ホームに戻る
        </a>
      </div>
    </div>
  )
})

export default app