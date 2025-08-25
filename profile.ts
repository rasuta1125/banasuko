// ユーザープロファイル管理API
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwtVerify, createRemoteJWKSet } from 'jose'
import { UserService } from '../../../src/services/userService'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('*', cors())

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

// ユーザープロファイル取得（認証付き）
app.get('/', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  return c.json({ success: true, ...user })
})

// ユーザープロファイル作成（新規登録時）
app.post('/', async (c) => {
  try {
    // Authorization ヘッダーからBearerトークンを取得
    const authorization = c.req.header('Authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Authorization token required' }, 401)
    }
    
    const idToken = authorization.substring(7) // 'Bearer ' を削除
    const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth'
    
    // Firebase IDトークンを検証
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    })
    
    // リクエストボディからユーザー情報を取得
    const body = await c.req.json()
    const { displayName, email } = body
    
    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }
    
    // Firestoreにユーザープロファイルを作成
    const userData = await UserService.createUserFromFirebaseAuth(
      payload.sub as string, // Firebase UID
      email as string,
      displayName as string
    )
    
    return c.json({ 
      success: true, 
      message: 'User profile created successfully',
      user: userData 
    })
    
  } catch (error) {
    console.error('Profile creation error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to create user profile' 
    }, 500)
  }
})

export default app