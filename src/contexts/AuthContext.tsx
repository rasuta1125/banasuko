// 認証コンテキスト - Firebase Auth状態管理
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth'
import { auth, User } from '../lib/firebase'
import { UserService } from '../services/userService'

// 認証コンテキストの型定義
interface AuthContextType {
  currentUser: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, username: string, displayName?: string) => Promise<User>
  logout: () => Promise<void>
  checkUsageLimit: () => Promise<{ canUse: boolean; remaining: number }>
  incrementUsage: (actionType: 'single_analysis' | 'ab_comparison' | 'copy_generation') => Promise<void>
  refreshUser: () => Promise<void>
}

// コンテキスト作成
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// プロバイダーコンポーネント
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Firebase認証状態監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setFirebaseUser(user)
        
        if (user) {
          // ログイン済みの場合、Firestoreからユーザー情報取得
          const userData = await UserService.getUserById(user.uid)
          setCurrentUser(userData)
        } else {
          // ログアウト状態
          setCurrentUser(null)
        }
      } catch (error) {
        console.error('Auth state change error:', error)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  // ログイン
  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true)
    try {
      const userData = await UserService.loginUser(email, password)
      setCurrentUser(userData)
      return userData
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // ユーザー登録
  const register = async (
    email: string, 
    password: string, 
    username: string, 
    displayName?: string
  ): Promise<User> => {
    setLoading(true)
    try {
      const userData = await UserService.registerUser(email, password, username, displayName)
      setCurrentUser(userData)
      return userData
    } catch (error) {
      console.error('Registration failed:', error)  
      throw error
    } finally {
      setLoading(false)
    }
  }

  // ログアウト
  const logout = async (): Promise<void> => {
    setLoading(true)
    try {
      await UserService.logoutUser()
      setCurrentUser(null)
      setFirebaseUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // 使用制限チェック
  const checkUsageLimit = async (): Promise<{ canUse: boolean; remaining: number }> => {
    if (!currentUser) {
      return { canUse: false, remaining: 0 }
    }

    try {
      return await UserService.checkUsageLimit(currentUser.uid)
    } catch (error) {
      console.error('Usage limit check failed:', error)
      return { canUse: false, remaining: 0 }
    }
  }

  // 使用回数増加
  const incrementUsage = async (
    actionType: 'single_analysis' | 'ab_comparison' | 'copy_generation'
  ): Promise<void> => {
    if (!currentUser) {
      throw new Error('ログインが必要です')
    }

    try {
      await UserService.incrementUsageCount(currentUser.uid, actionType)
      // ユーザー情報を再取得して状態更新
      await refreshUser()
    } catch (error) {
      console.error('Usage increment failed:', error)
      throw error
    }
  }

  // ユーザー情報再取得
  const refreshUser = async (): Promise<void> => {
    if (!firebaseUser) return

    try {
      const userData = await UserService.getUserById(firebaseUser.uid)
      setCurrentUser(userData)
    } catch (error) {
      console.error('User refresh failed:', error)
    }
  }

  // コンテキスト値
  const value: AuthContextType = {
    currentUser,
    firebaseUser,
    loading,
    login,
    register,
    logout,
    checkUsageLimit,
    incrementUsage,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// 認証が必要なコンポーネントを保護するHOC
interface RequireAuthProps {
  children: ReactNode
  fallback?: ReactNode
}

export const RequireAuth = ({ children, fallback }: RequireAuthProps) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue"></div>
      </div>
    )
  }

  if (!currentUser) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">ログインが必要です</h2>
          <a 
            href="/login" 
            className="bg-cyber-blue text-white px-6 py-3 rounded-lg hover:bg-cyber-purple transition-colors"
          >
            ログインページへ
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}