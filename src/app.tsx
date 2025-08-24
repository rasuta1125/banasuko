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

// CORS OPTIONS handlers
app.options('/api/session', (c) => {
  return c.body(null, 204);
});

app.options('/api/auth/user', (c) => {
  return c.body(null, 204);
});

app.options('/api/user/profile', (c) => {
  return c.body(null, 204);
});

app.options('/api/usage/dashboard', (c) => {
  return c.body(null, 204);
});

// セッションからユーザー情報を取得するヘルパー関数
const getUserFromSession = (c: any) => {
  const sessionCookie = c.req.header('Cookie')?.split(';')
    .find(cookie => cookie.trim().startsWith('bn_session='))
  
  if (!sessionCookie) {
    return null
  }
  
  const sessionValue = sessionCookie.split('=')[1]
  if (sessionValue?.startsWith('uid:')) {
    return {
      uid: sessionValue.replace('uid:', ''),
      authenticated: true
    }
  }
  
  return null
}

// ユーザー認証状態確認エンドポイント
app.get('/api/auth/user', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    // 実際のユーザー情報を返す（デモデータではなく）
    // TODO: Firestoreからユーザー情報を取得
    return c.json({
      success: true,
      user: {
        uid: user.uid,
        email: `user-${user.uid.substring(0, 8)}@example.com`, // 一時的な表示
        plan: 'free',
        authenticated: true
      }
    })
  } catch (error) {
    console.error('ユーザー認証確認エラー:', error)
    return c.json({ success: false, message: 'Authentication check failed' }, 500)
  }
})

// ユーザープロファイル作成・取得エンドポイント
app.post('/api/user/profile', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    const body = await c.req.json()
    
    // TODO: Firestoreにユーザープロファイルを作成
    console.log('ユーザープロファイル作成:', { uid: user.uid, ...body })
    
    return c.json({
      success: true,
      message: 'Profile created successfully',
      user: {
        uid: user.uid,
        email: body.email,
        plan: 'free',
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('プロファイル作成エラー:', error)
    return c.json({ success: false, message: 'Profile creation failed' }, 500)
  }
})

// 使用状況ダッシュボードデータ取得
app.get('/api/usage/dashboard', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    // TODO: Firestoreから実際の使用状況を取得
    const dashboardData = {
      user: {
        uid: user.uid,
        email: `user-${user.uid.substring(0, 8)}@example.com`,
        plan: 'free',
        planName: 'フリープラン'
      },
      usage: {
        singleAnalysis: { used: 0, limit: 10 },
        abComparison: { used: 0, limit: 5 },
        copyGeneration: { used: 0, limit: 3 }
      },
      daysUntilReset: 30
    }

    return c.json({
      success: true,
      data: dashboardData
    })
  } catch (error) {
    console.error('ダッシュボードデータ取得エラー:', error)
    return c.json({ success: false, message: 'Dashboard data fetch failed' }, 500)
  }
})

// ログアウトエンドポイント
app.post('/api/auth/logout', async (c) => {
  console.log('🚪 ログアウトエンドポイント呼び出し')
  try {
    // セッションクッキーを削除
    c.header('Set-Cookie', 'bn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0')
    
    console.log('✅ ログアウト成功 - セッションクッキー削除完了')
    return c.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('❌ ログアウトエラー:', error)
    return c.json({ success: false, message: 'Logout failed' }, 500)
  }
})

// CORS OPTIONS handler for logout
app.options('/api/auth/logout', (c) => {
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