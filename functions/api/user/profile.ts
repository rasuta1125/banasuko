// ユーザープロファイル管理API - Firestore連携版
import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_PRIVATE_KEY: string
  FIREBASE_CLIENT_EMAIL: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('*', cors())

// Firestore接続
async function getFirestore(c: any) {
  const { initializeApp, cert } = await import('firebase-admin/app')
  const { getFirestore } = await import('firebase-admin/firestore')
  
  const privateKey = c.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  
  const firebaseApp = initializeApp({
    credential: cert({
      projectId: c.env.FIREBASE_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: c.env.FIREBASE_CLIENT_EMAIL,
    }),
    projectId: c.env.FIREBASE_PROJECT_ID,
  })
  
  return getFirestore(firebaseApp)
}

// ユーザープロファイル作成（新規登録時）
app.post('/', async (c) => {
  try {
    console.log('📝 User profile creation request received');
    
    // リクエストボディからユーザー情報を取得
    const body = await c.req.json()
    const { email, displayName, plan = 'free', uid } = body
    
    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }
    
    // Firestoreに接続
    const db = await getFirestore(c)
    
    // ユーザーIDの生成（登録APIから渡されたUIDを使用、または新規生成）
    const userId = uid || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Firestoreにユーザープロファイルを保存
    const userData = {
      uid: userId,
      email: email,
      displayName: displayName || email.split('@')[0],
      plan: plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Firestoreに書き込み
    await db.collection('users').doc(userId).set(userData)
    
    console.log('✅ User profile saved to Firestore:', userData.email);
    
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
        errorType: error.constructor.name,
        message: error.message
      }
    }, 500)
  }
})

export default app