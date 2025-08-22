// ユーザー管理サービス - Firestore操作
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  Timestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth'

import { db, auth, User, UsageLog, DEFAULT_PLANS } from '../lib/firebase'

// ユーザー管理クラス
export class UserService {
  
  // ユーザー登録
  static async registerUser(
    email: string, 
    password: string, 
    username: string,
    displayName?: string
  ): Promise<User> {
    try {
      // Firebase Auth でユーザー作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // プロファイル更新
      if (displayName) {
        await updateProfile(firebaseUser, { displayName })
      }

      // Firestore にユーザー情報保存
      const userData: any = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        username: username,
        displayName: displayName || username,
        plan: 'free', // デフォルトはフリープラン
        usageCount: 0,
        maxUsage: DEFAULT_PLANS.free.maxUsage,
        createdAt: Timestamp.now(),
        lastLoginAt: Timestamp.now(),
        isActive: true
      }
      
      // photoURLが存在する場合のみ追加
      if (firebaseUser.photoURL) {
        userData.photoURL = firebaseUser.photoURL
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), userData)
      
      console.log('User registered successfully:', userData.uid)
      return userData as User

    } catch (error) {
      console.error('User registration error:', error)
      throw error
    }
  }

  // ユーザーログイン
  static async loginUser(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // 最終ログイン時刻を更新
      await this.updateLastLogin(firebaseUser.uid)

      // Firestore からユーザー情報取得
      const userData = await this.getUserById(firebaseUser.uid)
      
      console.log('User logged in successfully:', userData.uid)
      return userData

    } catch (error) {
      console.error('User login error:', error)
      throw error
    }
  }

  // ユーザーログアウト
  static async logoutUser(): Promise<void> {
    try {
      await firebaseSignOut(auth)
      console.log('User logged out successfully')
    } catch (error) {
      console.error('User logout error:', error)
      throw error
    }
  }

  // ユーザー情報取得（UID）
  static async getUserById(uid: string): Promise<User> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      
      if (!userDoc.exists()) {
        throw new Error('User not found')
      }

      return { uid, ...userDoc.data() } as User

    } catch (error) {
      console.error('Get user error:', error)
      throw error
    }
  }

  // ユーザー情報取得（メール）
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', email), limit(1))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return null
      }

      const userDoc = querySnapshot.docs[0]
      return { uid: userDoc.id, ...userDoc.data() } as User

    } catch (error) {
      console.error('Get user by email error:', error)
      return null
    }
  }

  // 最終ログイン時刻更新
  static async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        lastLoginAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Update last login error:', error)
    }
  }

  // プラン変更
  static async updateUserPlan(uid: string, newPlan: 'free' | 'basic' | 'premium'): Promise<void> {
    try {
      const planConfig = DEFAULT_PLANS[newPlan]
      
      await updateDoc(doc(db, 'users', uid), {
        plan: newPlan,
        maxUsage: planConfig.maxUsage,
        // 使用回数はリセットしない（月初にリセットする想定）
      })

      console.log(`User ${uid} plan updated to ${newPlan}`)
    } catch (error) {
      console.error('Update user plan error:', error)
      throw error
    }
  }

  // 使用回数チェック
  static async checkUsageLimit(uid: string): Promise<{ canUse: boolean; remaining: number }> {
    try {
      const user = await this.getUserById(uid)
      
      // プレミアムプランは無制限
      if (user.plan === 'premium') {
        return { canUse: true, remaining: -1 }
      }

      const remaining = user.maxUsage - user.usageCount
      const canUse = remaining > 0

      return { canUse, remaining }

    } catch (error) {
      console.error('Check usage limit error:', error)
      return { canUse: false, remaining: 0 }
    }
  }

  // 使用回数増加
  static async incrementUsageCount(uid: string, actionType: UsageLog['actionType']): Promise<void> {
    try {
      // 使用制限チェック
      const { canUse } = await this.checkUsageLimit(uid)
      if (!canUse) {
        throw new Error('Usage limit exceeded')
      }

      // 使用回数増加
      await updateDoc(doc(db, 'users', uid), {
        usageCount: increment(1)
      })

      // 使用ログ記録
      await this.recordUsageLog(uid, actionType, true)

      console.log(`Usage incremented for user ${uid}:`, actionType)

    } catch (error) {
      console.error('Increment usage error:', error)
      // エラーログも記録
      await this.recordUsageLog(uid, actionType, false, error.message)
      throw error
    }
  }

  // 使用ログ記録
  static async recordUsageLog(
    userId: string, 
    actionType: UsageLog['actionType'], 
    success: boolean,
    errorMessage?: string,
    metadata?: UsageLog['metadata']
  ): Promise<void> {
    try {
      const usageLog: Omit<UsageLog, 'id'> = {
        userId,
        actionType,
        timestamp: Timestamp.now(),
        metadata: {
          success,
          errorMessage,
          ...metadata
        }
      }

      await addDoc(collection(db, 'usage_logs'), usageLog)

    } catch (error) {
      console.error('Record usage log error:', error)
      // ログ記録エラーは致命的ではないので投げない
    }
  }

  // 使用回数リセット（月初に実行）
  static async resetUsageCount(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        usageCount: 0
      })

      console.log(`Usage count reset for user ${uid}`)
    } catch (error) {
      console.error('Reset usage count error:', error)
      throw error
    }
  }

  // ユーザー一覧取得（管理者用）
  static async getAllUsers(limitCount = 50): Promise<User[]> {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, orderBy('createdAt', 'desc'), limit(limitCount))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      } as User))

    } catch (error) {
      console.error('Get all users error:', error)
      return []
    }
  }

  // アクティブユーザー数取得
  static async getActiveUserCount(): Promise<number> {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('isActive', '==', true))
      const querySnapshot = await getDocs(q)

      return querySnapshot.size
    } catch (error) {
      console.error('Get active user count error:', error)
      return 0
    }
  }

  // ユーザー削除（論理削除）
  static async deactivateUser(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', uid), {
        isActive: false
      })

      console.log(`User ${uid} deactivated`)
    } catch (error) {
      console.error('Deactivate user error:', error)
      throw error
    }
  }
}