// Firebase設定とクライアント初期化
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, Timestamp } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Firebase設定 (スクリーンショットから取得)
const firebaseConfig = {
  apiKey: "AIzaSyAflp1vqSA21sSYihZDTpje-MB1mCALxBs",
  authDomain: "banasuko-auth.firebaseapp.com",
  projectId: "banasuko-auth", 
  storageBucket: "banasuko-auth.firebasestorage.app",
  messagingSenderId: "753581941845",
  appId: "1:753581941845:web:18418afb254c309933e0dc",
  measurementId: "G-09515RW8KC"
}

// Firebase アプリ初期化
export const app = initializeApp(firebaseConfig)

// サービス初期化
export const auth = getAuth(app)
export const db = getFirestore(app)

// Analytics (ブラウザ環境でのみ)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

// 開発環境でのエミュレーター接続（必要に応じて）
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Auth Emulator
  try {
    if (!auth.config.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    }
  } catch (error) {
    // Emulator not running, use production
  }
  
  // Firestore Emulator
  try {
    if (!(db as any)._delegate._databaseId.projectId.includes('(default)')) {
      connectFirestoreEmulator(db, 'localhost', 8080)
    }
  } catch (error) {
    // Emulator not running, use production
  }
}

// ユーザータイプ定義
export interface User {
  uid: string
  email: string
  username: string
  displayName?: string
  photoURL?: string | null  // nullも許可
  plan: 'free' | 'basic' | 'premium'
  usageCount: number
  maxUsage: number
  createdAt: Timestamp
  lastLoginAt: Timestamp
  isActive: boolean
}

// 使用ログタイプ定義
export interface UsageLog {
  id?: string
  userId: string
  actionType: 'single_analysis' | 'ab_comparison' | 'copy_generation'
  timestamp: Timestamp
  metadata?: {
    imageSize?: number
    processingTime?: number
    success: boolean
    errorMessage?: string
  }
}

// プランタイプ定義
export interface Plan {
  id: 'free' | 'basic' | 'premium'
  name: string
  displayName: string
  maxUsage: number
  price: number
  features: string[]
  isActive: boolean
}

// デフォルトプラン設定
export const DEFAULT_PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'free',
    displayName: 'フリープラン',
    maxUsage: 10,
    price: 0,
    features: [
      'AI広告診断 月10回まで',
      'A/B比較分析 月5回まで',
      '基本的なレポート',
    ],
    isActive: true
  },
  basic: {
    id: 'basic', 
    name: 'basic',
    displayName: 'ベーシックプラン',
    maxUsage: 100,
    price: 2980,
    features: [
      'AI広告診断 月100回まで',
      'A/B比較分析 月50回まで',
      'AIコピー生成 月30回まで',
      '詳細レポート・統計',
      'メールサポート'
    ],
    isActive: true
  },
  premium: {
    id: 'premium',
    name: 'premium', 
    displayName: 'プレミアムプラン',
    maxUsage: -1, // 無制限
    price: 9800,
    features: [
      'AI広告診断 無制限',
      'A/B比較分析 無制限', 
      'AIコピー生成 無制限',
      '高度な分析・予測機能',
      'カスタムレポート作成',
      '優先サポート',
      'API アクセス'
    ],
    isActive: true
  }
}

export { Timestamp }