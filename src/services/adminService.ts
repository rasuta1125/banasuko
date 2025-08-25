// 管理者用サービス - 統計・管理機能
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  count,
  getCountFromServer,
  Timestamp
} from 'firebase/firestore'

import { db, User, UsageLog, DEFAULT_PLANS } from '../lib/firebase'
import { UserService } from './userService'
import { UsageLimitService } from './usageLimitService'

// 管理者サービスクラス
export class AdminService {

  // 管理者権限チェック
  static async checkAdminAccess(uid: string): Promise<boolean> {
    try {
      const adminDoc = await getDoc(doc(db, 'admins', uid))
      return adminDoc.exists()
    } catch (error) {
      console.error('Admin access check error:', error)
      return false
    }
  }

  // ダッシュボード統計取得
  static async getDashboardStats(): Promise<{
    totalUsers: number
    activeUsers: number
    monthlyRevenue: number
    monthlyApiUsage: number
    userGrowth: number
    activeRate: number
    revenueGrowth: number
    apiUsageGrowth: number
    planDistribution: Record<User['plan'], number>
  }> {
    try {
      // 現在の月
      const now = new Date()
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

      // 総ユーザー数
      const usersRef = collection(db, 'users')
      const totalUsersSnap = await getCountFromServer(usersRef)
      const totalUsers = totalUsersSnap.data().count

      // 今月新規ユーザー数
      const thisMonthUsersQuery = query(
        usersRef,
        where('createdAt', '>=', Timestamp.fromDate(thisMonthStart))
      )
      const thisMonthUsersSnap = await getCountFromServer(thisMonthUsersQuery)
      const userGrowth = thisMonthUsersSnap.data().count

      // アクティブユーザー数（今月ログインしたユーザー）
      const activeUsersQuery = query(
        usersRef,
        where('lastLoginAt', '>=', Timestamp.fromDate(thisMonthStart)),
        where('isActive', '==', true)
      )
      const activeUsersSnap = await getCountFromServer(activeUsersQuery)
      const activeUsers = activeUsersSnap.data().count
      const activeRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0

      // プラン別ユーザー数
      const planDistribution: Record<User['plan'], number> = { free: 0, basic: 0, premium: 0 }
      
      for (const plan of Object.keys(planDistribution) as User['plan'][]) {
        const planQuery = query(usersRef, where('plan', '==', plan))
        const planSnap = await getCountFromServer(planQuery)
        planDistribution[plan] = planSnap.data().count
      }

      // 月間収益計算（有料プランユーザー数 × 料金）
      const monthlyRevenue = 
        planDistribution.basic * DEFAULT_PLANS.basic.price +
        planDistribution.premium * DEFAULT_PLANS.premium.price

      // 前月収益（簡易計算）
      const lastMonthUsersQuery = query(
        usersRef,
        where('createdAt', '>=', Timestamp.fromDate(lastMonthStart)),
        where('createdAt', '<=', Timestamp.fromDate(lastMonthEnd))
      )
      const lastMonthUsers = await getDocs(lastMonthUsersQuery)
      let lastMonthRevenue = 0
      lastMonthUsers.docs.forEach(doc => {
        const userData = doc.data() as User
        if (userData.plan === 'basic') lastMonthRevenue += DEFAULT_PLANS.basic.price
        if (userData.plan === 'premium') lastMonthRevenue += DEFAULT_PLANS.premium.price
      })

      const revenueGrowth = lastMonthRevenue > 0 
        ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) 
        : 0

      // 月間API使用数
      const usageLogsRef = collection(db, 'usage_logs')
      const thisMonthUsageQuery = query(
        usageLogsRef,
        where('timestamp', '>=', Timestamp.fromDate(thisMonthStart)),
        where('metadata.success', '==', true)
      )
      const thisMonthUsageSnap = await getCountFromServer(thisMonthUsageQuery)
      const monthlyApiUsage = thisMonthUsageSnap.data().count

      // 前月API使用数
      const lastMonthUsageQuery = query(
        usageLogsRef,
        where('timestamp', '>=', Timestamp.fromDate(lastMonthStart)),
        where('timestamp', '<=', Timestamp.fromDate(lastMonthEnd)),
        where('metadata.success', '==', true)
      )
      const lastMonthUsageSnap = await getCountFromServer(lastMonthUsageQuery)
      const lastMonthApiUsage = lastMonthUsageSnap.data().count
      
      const apiUsageGrowth = lastMonthApiUsage > 0 
        ? monthlyApiUsage - lastMonthApiUsage 
        : monthlyApiUsage

      return {
        totalUsers,
        activeUsers,
        monthlyRevenue,
        monthlyApiUsage,
        userGrowth,
        activeRate,
        revenueGrowth,
        apiUsageGrowth,
        planDistribution
      }

    } catch (error) {
      console.error('Get dashboard stats error:', error)
      return {
        totalUsers: 0,
        activeUsers: 0,
        monthlyRevenue: 0,
        monthlyApiUsage: 0,
        userGrowth: 0,
        activeRate: 0,
        revenueGrowth: 0,
        apiUsageGrowth: 0,
        planDistribution: { free: 0, basic: 0, premium: 0 }
      }
    }
  }

  // ユーザー一覧取得（ページネーション付き）
  static async getUsersList(
    pageSize = 10,
    lastDoc?: any,
    planFilter?: User['plan']
  ): Promise<{
    users: (User & { usageStats?: any })[]
    hasMore: boolean
    lastDoc: any
  }> {
    try {
      let q = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      )

      // プランフィルター
      if (planFilter) {
        q = query(
          collection(db, 'users'),
          where('plan', '==', planFilter),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        )
      }

      // ページネーション
      if (lastDoc) {
        q = query(q, startAfter(lastDoc))
      }

      const querySnapshot = await getDocs(q)
      const users: (User & { usageStats?: any })[] = []

      // 各ユーザーの使用統計も取得
      for (const doc of querySnapshot.docs) {
        const userData = { uid: doc.id, ...doc.data() } as User
        
        // 使用統計を取得
        try {
          const usageStats = await UsageLimitService.getMonthlyUsageStats(userData.uid)
          users.push({ ...userData, usageStats })
        } catch (error) {
          users.push(userData)
        }
      }

      const hasMore = querySnapshot.docs.length === pageSize
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1]

      return {
        users,
        hasMore,
        lastDoc: lastDocument
      }

    } catch (error) {
      console.error('Get users list error:', error)
      return { users: [], hasMore: false, lastDoc: null }
    }
  }

  // ユーザー情報更新
  static async updateUser(
    uid: string, 
    updates: Partial<Pick<User, 'username' | 'email' | 'plan' | 'isActive'>>
  ): Promise<void> {
    try {
      // プラン変更の場合は追加処理
      if (updates.plan) {
        await UserService.updateUserPlan(uid, updates.plan)
        delete updates.plan // UserServiceで処理済み
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'users', uid), updates)
      }

      console.log(`User ${uid} updated successfully`)
    } catch (error) {
      console.error('Update user error:', error)
      throw error
    }
  }

  // ユーザー削除（論理削除）
  static async deactivateUser(uid: string): Promise<void> {
    try {
      await UserService.deactivateUser(uid)
      console.log(`User ${uid} deactivated`)
    } catch (error) {
      console.error('Deactivate user error:', error)
      throw error
    }
  }

  // 最近のアクティビティ取得
  static async getRecentActivity(limitCount = 20): Promise<{
    type: 'user_registration' | 'plan_change' | 'api_usage'
    userId: string
    username?: string
    details: string
    timestamp: Timestamp
  }[]> {
    try {
      const activities: any[] = []

      // 新規ユーザー登録
      const recentUsersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(5)
      )
      const recentUsers = await getDocs(recentUsersQuery)
      recentUsers.docs.forEach(doc => {
        const userData = doc.data() as User
        activities.push({
          type: 'user_registration',
          userId: userData.uid,
          username: userData.username,
          details: `新規ユーザー登録 (${userData.plan}プラン)`,
          timestamp: userData.createdAt
        })
      })

      // 最近のAPI使用
      const recentUsageQuery = query(
        collection(db, 'usage_logs'),
        orderBy('timestamp', 'desc'),
        limit(10)
      )
      const recentUsage = await getDocs(recentUsageQuery)
      recentUsage.docs.forEach(doc => {
        const usageData = doc.data() as UsageLog
        const actionNames = {
          single_analysis: 'AI診断実行',
          ab_comparison: 'A/B比較分析', 
          copy_generation: 'AIコピー生成'
        }
        activities.push({
          type: 'api_usage',
          userId: usageData.userId,
          details: actionNames[usageData.actionType],
          timestamp: usageData.timestamp
        })
      })

      // タイムスタンプでソートして制限
      activities.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
      return activities.slice(0, limitCount)

    } catch (error) {
      console.error('Get recent activity error:', error)
      return []
    }
  }

  // 全ユーザーの使用回数リセット
  static async resetAllUsageCounts(): Promise<{ success: number; failed: number }> {
    try {
      const users = await UserService.getAllUsers(1000) // バッチサイズ
      let success = 0
      let failed = 0

      for (const user of users) {
        try {
          await UserService.resetUsageCount(user.uid)
          success++
        } catch (error) {
          console.error(`Failed to reset usage for user ${user.uid}:`, error)
          failed++
        }
      }

      console.log(`Usage reset completed: ${success} success, ${failed} failed`)
      return { success, failed }

    } catch (error) {
      console.error('Reset all usage counts error:', error)
      return { success: 0, failed: 0 }
    }
  }

  // データエクスポート用のユーザーデータ取得
  static async exportUserData(): Promise<{
    users: User[]
    summary: {
      totalUsers: number
      planDistribution: Record<User['plan'], number>
      exportDate: string
    }
  }> {
    try {
      const users = await UserService.getAllUsers(10000) // 大きめのバッチサイズ
      
      const planDistribution: Record<User['plan'], number> = { free: 0, basic: 0, premium: 0 }
      users.forEach(user => {
        planDistribution[user.plan] = (planDistribution[user.plan] || 0) + 1
      })

      return {
        users,
        summary: {
          totalUsers: users.length,
          planDistribution,
          exportDate: new Date().toISOString()
        }
      }

    } catch (error) {
      console.error('Export user data error:', error)
      throw error
    }
  }

  // ユーザー検索
  static async searchUsers(searchTerm: string): Promise<User[]> {
    try {
      // Firestoreの制限により、フロントエンドでフィルタリング
      const users = await UserService.getAllUsers(1000)
      
      const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return filteredUsers.slice(0, 50) // 結果を制限

    } catch (error) {
      console.error('Search users error:', error)
      return []
    }
  }
}