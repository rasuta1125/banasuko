// 使用制限管理サービス - 詳細な制限機能
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  Timestamp,
  startOfMonth,
  endOfMonth
} from 'firebase/firestore'

import { db, User, UsageLog, DEFAULT_PLANS } from '../lib/firebase'
import { UserService } from './userService'

// 使用制限管理クラス
export class UsageLimitService {

  // アクション別使用制限チェック
  static async checkActionUsageLimit(
    uid: string, 
    actionType: UsageLog['actionType']
  ): Promise<{ canUse: boolean; remaining: number; actionLimit: number }> {
    try {
      const user = await UserService.getUserById(uid)
      
      // プレミアムプランは無制限
      if (user.plan === 'premium') {
        return { canUse: true, remaining: -1, actionLimit: -1 }
      }

      // アクション別制限設定
      const actionLimits = this.getActionLimits(user.plan)
      const actionLimit = actionLimits[actionType] || 0

      // 今月の使用回数取得
      const monthlyUsage = await this.getMonthlyActionUsage(uid, actionType)
      const remaining = actionLimit - monthlyUsage
      const canUse = remaining > 0

      return { canUse, remaining, actionLimit }

    } catch (error) {
      console.error('Check action usage limit error:', error)
      return { canUse: false, remaining: 0, actionLimit: 0 }
    }
  }

  // プラン別アクション制限設定
  static getActionLimits(plan: User['plan']): Record<UsageLog['actionType'], number> {
    switch (plan) {
      case 'free':
        return {
          single_analysis: 10,
          ab_comparison: 5,
          copy_generation: 3
        }
      case 'basic':
        return {
          single_analysis: 100,
          ab_comparison: 50,
          copy_generation: 30
        }
      case 'premium':
        return {
          single_analysis: -1, // 無制限
          ab_comparison: -1,
          copy_generation: -1
        }
      default:
        return {
          single_analysis: 0,
          ab_comparison: 0,
          copy_generation: 0
        }
    }
  }

  // 今月の使用回数取得（アクション別）
  static async getMonthlyActionUsage(
    uid: string, 
    actionType: UsageLog['actionType']
  ): Promise<number> {
    try {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

      const usageRef = collection(db, 'usage_logs')
      const q = query(
        usageRef,
        where('userId', '==', uid),
        where('actionType', '==', actionType),
        where('timestamp', '>=', Timestamp.fromDate(monthStart)),
        where('timestamp', '<=', Timestamp.fromDate(monthEnd)),
        where('metadata.success', '==', true)
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.size

    } catch (error) {
      console.error('Get monthly action usage error:', error)
      return 0
    }
  }

  // 全体の今月使用統計取得
  static async getMonthlyUsageStats(uid: string): Promise<{
    totalUsage: number
    actionUsage: Record<UsageLog['actionType'], number>
    remainingUsage: Record<UsageLog['actionType'], number>
    plan: User['plan']
    limits: Record<UsageLog['actionType'], number>
  }> {
    try {
      const user = await UserService.getUserById(uid)
      const limits = this.getActionLimits(user.plan)
      
      const actionTypes: UsageLog['actionType'][] = ['single_analysis', 'ab_comparison', 'copy_generation']
      const actionUsage: Record<UsageLog['actionType'], number> = {} as any
      const remainingUsage: Record<UsageLog['actionType'], number> = {} as any
      let totalUsage = 0

      // 各アクションの使用回数を取得
      for (const actionType of actionTypes) {
        const usage = await this.getMonthlyActionUsage(uid, actionType)
        actionUsage[actionType] = usage
        
        const limit = limits[actionType]
        remainingUsage[actionType] = limit === -1 ? -1 : Math.max(0, limit - usage)
        
        totalUsage += usage
      }

      return {
        totalUsage,
        actionUsage,
        remainingUsage,
        plan: user.plan,
        limits
      }

    } catch (error) {
      console.error('Get monthly usage stats error:', error)
      return {
        totalUsage: 0,
        actionUsage: { single_analysis: 0, ab_comparison: 0, copy_generation: 0 },
        remainingUsage: { single_analysis: 0, ab_comparison: 0, copy_generation: 0 },
        plan: 'free',
        limits: { single_analysis: 0, ab_comparison: 0, copy_generation: 0 }
      }
    }
  }

  // 使用回数リセット（月初に実行する処理）
  static async resetMonthlyUsage(): Promise<void> {
    try {
      // 全ユーザーの使用回数をリセット
      const users = await UserService.getAllUsers(1000) // バッチサイズ制限
      
      for (const user of users) {
        await UserService.resetUsageCount(user.uid)
      }

      console.log(`Monthly usage reset completed for ${users.length} users`)

    } catch (error) {
      console.error('Reset monthly usage error:', error)
      throw error
    }
  }

  // プラン変更時の制限チェック
  static canUpgradePlan(currentPlan: User['plan'], targetPlan: User['plan']): boolean {
    const planHierarchy = { free: 0, basic: 1, premium: 2 }
    return planHierarchy[targetPlan] > planHierarchy[currentPlan]
  }

  static canDowngradePlan(currentPlan: User['plan'], targetPlan: User['plan']): boolean {
    const planHierarchy = { free: 0, basic: 1, premium: 2 }
    return planHierarchy[targetPlan] < planHierarchy[currentPlan]
  }

  // プラン別機能制限チェック
  static checkFeatureAccess(plan: User['plan'], feature: string): boolean {
    const featureAccess: Record<User['plan'], string[]> = {
      free: [
        'single_analysis',
        'basic_reports'
      ],
      basic: [
        'single_analysis',
        'ab_comparison', 
        'copy_generation',
        'detailed_reports',
        'email_support'
      ],
      premium: [
        'single_analysis',
        'ab_comparison',
        'copy_generation', 
        'detailed_reports',
        'custom_reports',
        'api_access',
        'priority_support',
        'advanced_analytics'
      ]
    }

    return featureAccess[plan]?.includes(feature) || false
  }

  // 使用制限に達した時の推奨アクション
  static getUpgradeRecommendation(
    currentPlan: User['plan'], 
    actionType: UsageLog['actionType']
  ): {
    shouldUpgrade: boolean
    recommendedPlan: User['plan']
    message: string
    benefits: string[]
  } {
    if (currentPlan === 'premium') {
      return {
        shouldUpgrade: false,
        recommendedPlan: 'premium',
        message: 'プレミアムプランをご利用中です',
        benefits: []
      }
    }

    const recommendations = {
      free: {
        shouldUpgrade: true,
        recommendedPlan: 'basic' as User['plan'],
        message: 'ベーシックプランにアップグレードして、より多くの分析を実行しましょう',
        benefits: [
          'AI広告診断 月100回まで',
          'A/B比較分析 月50回まで', 
          'AIコピー生成 月30回まで',
          '詳細レポート・統計機能',
          'メールサポート'
        ]
      },
      basic: {
        shouldUpgrade: true,
        recommendedPlan: 'premium' as User['plan'],
        message: 'プレミアムプランで無制限の分析を体験しましょう',
        benefits: [
          '全機能 無制限利用',
          '高度な分析・予測機能',
          'カスタムレポート作成',
          'API アクセス',
          '優先サポート'
        ]
      }
    }

    return recommendations[currentPlan] || recommendations.free
  }

  // 使用統計ダッシュボード用データ
  static async getDashboardStats(uid: string): Promise<{
    currentUsage: Record<UsageLog['actionType'], number>
    limits: Record<UsageLog['actionType'], number>
    usagePercentage: Record<UsageLog['actionType'], number>
    plan: User['plan']
    daysUntilReset: number
    recentActivity: UsageLog[]
  }> {
    try {
      const stats = await this.getMonthlyUsageStats(uid)
      
      // 使用率計算
      const usagePercentage: Record<UsageLog['actionType'], number> = {} as any
      for (const actionType of Object.keys(stats.actionUsage) as UsageLog['actionType'][]) {
        const usage = stats.actionUsage[actionType]
        const limit = stats.limits[actionType]
        usagePercentage[actionType] = limit === -1 ? 0 : Math.round((usage / limit) * 100)
      }

      // 月末までの日数
      const now = new Date()
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      const daysUntilReset = Math.ceil((monthEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // 最近のアクティビティ
      const recentActivity = await this.getRecentActivity(uid, 10)

      return {
        currentUsage: stats.actionUsage,
        limits: stats.limits,
        usagePercentage,
        plan: stats.plan,
        daysUntilReset,
        recentActivity
      }

    } catch (error) {
      console.error('Get dashboard stats error:', error)
      throw error
    }
  }

  // 最近のアクティビティ取得
  static async getRecentActivity(uid: string, limitCount = 10): Promise<UsageLog[]> {
    try {
      const usageRef = collection(db, 'usage_logs')
      const q = query(
        usageRef,
        where('userId', '==', uid),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UsageLog))

    } catch (error) {
      console.error('Get recent activity error:', error)
      return []
    }
  }
}