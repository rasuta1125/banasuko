// 認証ミドルウェア - Firebase統合
import { Context } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { UserService } from '../services/userService'
import { User } from '../lib/firebase'

// JWTトークンの代わりにFirebase UIDベースの簡易トークンを使用
export interface AuthToken {
  uid: string
  email: string
  iat: number // issued at
  exp: number // expiration
}

// トークン生成（簡易版）
export function generateAuthToken(user: User): string {
  const tokenData: AuthToken = {
    uid: user.uid,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7日間
  }
  
  // 実際のプロダクションではJWTライブラリを使用
  return btoa(JSON.stringify(tokenData))
}

// トークン検証
export function verifyAuthToken(token: string): AuthToken | null {
  try {
    const decoded = JSON.parse(atob(token)) as AuthToken
    
    // 有効期限チェック
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    
    return decoded
  } catch {
    return null
  }
}

// 認証ミドルウェア
export async function authMiddleware(c: Context, next: Function) {
  let token = getCookie(c, 'auth-token')
  
  // Cookieにトークンがない場合、Authorizationヘッダーをチェック
  if (!token) {
    const authHeader = c.req.header('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7) // "Bearer " を除去
    }
  }
  
  if (token) {
    const decoded = verifyAuthToken(token)
    if (decoded) {
      try {
        // デモユーザーの場合は直接ユーザー情報を設定
        if (decoded.uid === 'demo-user-123') {
          const demoUser = {
            uid: 'demo-user-123',
            email: 'demo@banasuko.com',
            username: 'demo',
            displayName: 'デモユーザー',
            plan: 'basic',
            usageCount: 5,
            maxUsage: 100,
            createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
            lastLoginAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
            isActive: true
          }
          c.set('user', demoUser)
        } else {
          // 通常のユーザーはFirestoreから取得
          const user = await UserService.getUserById(decoded.uid)
          c.set('user', user)
        }
      } catch (error) {
        // ユーザーが見つからない場合、トークンを削除
        deleteCookie(c, 'auth-token')
      }
    }
  }
  
  await next()
}

// ログイン必須ミドルウェア
export function requireAuth(c: Context, next: Function) {
  const user = c.get('user') as User | undefined
  
  if (!user) {
    return c.redirect('/login')
  }
  
  return next()
}

// デモログイン処理
export async function handleDemoLogin(c: Context) {
  try {
    // デモユーザー情報
    const demoUser: User = {
      uid: 'demo-user-123',
      email: 'demo@banasuko.com',
      username: 'demo',
      displayName: 'デモユーザー',
      plan: 'basic', // デモはベーシックプラン相当
      usageCount: 5,
      maxUsage: 100,
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      lastLoginAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      isActive: true
    }
    
    // デモトークン生成
    const token = generateAuthToken(demoUser)
    
    // クッキーに保存（7日間）
    setCookie(c, 'auth-token', token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
      secure: true, // Cloudflare Pages は常にHTTPS
      sameSite: 'Lax'
    })
    
    return c.json({
      success: true,
      user: demoUser,
      token: token,
      message: 'デモログインが完了しました'
    })
    
  } catch (error) {
    console.error('Demo login error:', error)
    return c.json({ 
      success: false, 
      error: 'デモログインに失敗しました' 
    }, 500)
  }
}

// Firebase認証ログイン処理
export async function handleFirebaseLogin(c: Context) {
  try {
    const { email, password } = await c.req.json()
    
    // UserServiceを使用してFirebase認証
    const user = await UserService.loginUser(email, password)
    
    // トークン生成
    const token = generateAuthToken(user)
    
    // クッキーに保存
    setCookie(c, 'auth-token', token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
      secure: true, // Cloudflare Pages は常にHTTPS
      sameSite: 'Lax'
    })
    
    return c.json({
      success: true,
      user: user,
      token: token,
      message: 'ログインが完了しました'
    })
    
  } catch (error) {
    console.error('Firebase login error:', error)
    return c.json({ 
      success: false, 
      error: error.message || 'ログインに失敗しました' 
    }, 401)
  }
}

// Firebase認証登録処理
export async function handleFirebaseRegister(c: Context) {
  try {
    const { email, password, username, displayName } = await c.req.json()
    
    // UserServiceを使用してユーザー作成
    const user = await UserService.registerUser(email, password, username, displayName)
    
    // トークン生成
    const token = generateAuthToken(user)
    
    // クッキーに保存
    setCookie(c, 'auth-token', token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true, 
      secure: true, // Cloudflare Pages は常にHTTPS
      sameSite: 'Lax'
    })
    
    return c.json({
      success: true,
      user: user,
      token: token,
      message: 'アカウントが作成されました'
    })
    
  } catch (error) {
    console.error('Firebase register error:', error)
    return c.json({ 
      success: false, 
      error: error.message || 'アカウント作成に失敗しました' 
    }, 400)
  }
}

// ログアウト処理
export async function handleLogout(c: Context) {
  try {
    // Firebase側でもログアウト処理を行う場合
    const user = c.get('user') as User | undefined
    if (user) {
      await UserService.logoutUser()
    }
    
    // クッキー削除
    deleteCookie(c, 'auth-token')
    
    return c.json({
      success: true,
      message: 'ログアウトしました'
    })
    
  } catch (error) {
    console.error('Logout error:', error)
    return c.json({ 
      success: false, 
      error: 'ログアウトに失敗しました' 
    }, 500)
  }
}