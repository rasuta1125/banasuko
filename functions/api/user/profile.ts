// ユーザープロファイル管理API - 簡易版
import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('*', cors())

// ユーザープロファイル作成（新規登録時）
app.post('/', async (c) => {
  try {
    console.log('📝 User profile creation request received');
    
    // リクエストボディからユーザー情報を取得
    const body = await c.req.json()
    const { email, displayName, plan = 'free' } = body
    
    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }
    
    // 簡易的なユーザープロファイル作成（実際のFirestore接続は後で実装）
    const userData = {
      uid: `user-${Date.now()}`,
      email: email,
      displayName: displayName || email.split('@')[0],
      plan: plan,
      createdAt: new Date().toISOString()
    }
    
    console.log('✅ User profile created:', userData.email);
    
    return c.json({ 
      success: true, 
      message: 'User profile created successfully',
      user: userData 
    })
    
  } catch (error) {
    console.error('💥 Profile creation error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to create user profile',
      debug: {
        timestamp: new Date().toISOString(),
        errorType: error.constructor.name
      }
    }, 500)
  }
})

export default app