import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

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
import { ScoringPage } from './components/ScoringPage'
// OpenAI クライアント初期化をcontext内で行うため、インポートのみ
import OpenAI from 'openai'
import { ANALYSIS_PROMPT, AB_COMPARISON_PROMPT, COPY_GENERATION_PROMPT } from './services/openai'

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('/api/*', cors())

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './public' }))

// Firebase認証統合
import { 
  authMiddleware, 
  requireAuth, 
  handleDemoLogin, 
  handleFirebaseLogin, 
  handleFirebaseRegister, 
  handleLogout 
} from './lib/authMiddleware'
import { UserService } from './services/userService'
import { UsageLimitService } from './services/usageLimitService'
import { User } from './lib/firebase'

// API エンドポイント（認証ミドルウェア適用前に定義）
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

// 採点API エンドポイント
app.post('/api/scoring/submit-answer', async (c) => {
  try {
    const { questionId, answer, timeSpent } = await c.req.json()
    
    // サンプル採点ロジック
    const correctAnswers = {
      '1': 3, // "すべて正しい"
      '2': null // エッセイ問題は手動採点
    }
    
    const isCorrect = correctAnswers[questionId as keyof typeof correctAnswers] === answer
    const score = isCorrect ? 10 : 0
    
    return c.json({
      success: true,
      result: {
        questionId,
        isCorrect,
        score,
        feedback: isCorrect ? '正解です！' : '不正解です。正解は「すべて正しい」です。',
        correctAnswer: correctAnswers[questionId as keyof typeof correctAnswers],
        timeSpent
      }
    })
  } catch (error) {
    return c.json({
      success: false,
      error: '採点処理でエラーが発生しました'
    }, 500)
  }
})

app.get('/api/scoring/test-data', async (c) => {
  const testItems = [
    {
      id: '1',
      type: 'multiple_choice',
      question: 'JavaScriptにおいて、変数を宣言するためのキーワードとして正しいものはどれですか？',
      options: ['var', 'let', 'const', 'すべて正しい'],
      correctAnswer: 3,
      maxPoints: 10,
      category: 'プログラミング基礎',
      difficulty: 'easy',
      timeLimit: 300
    },
    {
      id: '2',
      type: 'multiple_choice', 
      question: 'CSSでFlexboxのコンテナに設定する基本プロパティはどれですか？',
      options: ['display: flex', 'flex-direction: row', 'justify-content: center', 'align-items: center'],
      correctAnswer: 0,
      maxPoints: 10,
      category: 'ウェブデザイン',
      difficulty: 'easy',
      timeLimit: 300
    },
    {
      id: '3',
      type: 'essay',
      question: 'レスポンシブデザインとは何か、その重要性とメリットについて説明してください。',
      maxPoints: 20,
      category: 'ウェブデザイン理論',
      difficulty: 'medium',
      timeLimit: 600
    }
  ]
  
  return c.json({
    success: true,
    testItems,
    totalQuestions: testItems.length,
    maxScore: testItems.reduce((sum, item) => sum + item.maxPoints, 0)
  })
})

// Firebase セッション作成エンドポイント
import { jwtVerify, createRemoteJWKSet } from 'jose'

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

app.post('/api/session', async (c) => {
  // body 安全に取得
  let idToken: string | undefined;
  try {
    const body = await c.req.json();
    idToken = body?.idToken;
  } catch (_) {}
  if (!idToken) return c.json({ ok: false, message: 'idToken required' }, 400);

  const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';
  try {
    // ここが一致しないと 401 になります
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    // 必要ならセッションクッキーを発行（任意）
    c.header('Set-Cookie',
      `bn_session=uid:${payload.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return c.json({
      ok: true,
      uid: payload.user_id,
      email: payload.email ?? null,
    });
  } catch (e: any) {
    console.error('Token verification error:', e);
    return c.json({ ok: false, message: e?.message || 'invalid token' }, 401);
  }
});

// CORS for session endpoint
app.options('/api/session', (c) => {
  c.header('Access-Control-Allow-Origin', c.req.header('Origin') || '*');
  c.header('Access-Control-Allow-Headers', 'content-type');
  c.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return c.body(null, 204);
});

// セッション削除
app.delete('/api/session', async (c) => {
  try {
    // クッキー削除
    const { deleteCookie } = await import('hono/cookie')
    deleteCookie(c, 'auth-token')
    
    return c.json({
      success: true,
      message: 'セッションが削除されました'
    })
  } catch (error) {
    console.error('Session deletion error:', error)
    return c.json({ 
      success: false, 
      error: 'セッション削除に失敗しました' 
    }, 500)
  }
})

// ユーザー情報取得
app.get('/api/auth/user', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  return c.json({ success: true, user })
})

// ユーザープロファイル取得（認証付き）
app.get('/api/user/profile', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  return c.json({ success: true, ...user })
})

// ユーザープロファイル作成（新規登録時）
app.post('/api/user/profile', async (c) => {
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

// 使用制限チェック（基本）
app.get('/api/usage/check', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  try {
    const usageInfo = await UserService.checkUsageLimit(user.uid)
    return c.json({ success: true, ...usageInfo })
  } catch (error) {
    return c.json({ success: false, error: '使用制限チェックに失敗しました' }, 500)
  }
})

// 詳細使用統計取得
app.get('/api/usage/stats', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  try {
    const stats = await UsageLimitService.getMonthlyUsageStats(user.uid)
    return c.json({ success: true, stats })
  } catch (error) {
    return c.json({ success: false, error: '使用統計取得に失敗しました' }, 500)
  }
})

// ダッシュボード用統計データ
app.get('/api/usage/dashboard', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  try {
    const dashboardData = await UsageLimitService.getDashboardStats(user.uid)
    return c.json({ success: true, data: dashboardData })
  } catch (error) {
    return c.json({ success: false, error: 'ダッシュボードデータ取得に失敗しました' }, 500)
  }
})

// アクション別使用制限チェック
app.get('/api/usage/check/:actionType', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  const actionType = c.req.param('actionType') as 'single_analysis' | 'ab_comparison' | 'copy_generation'
  
  if (!['single_analysis', 'ab_comparison', 'copy_generation'].includes(actionType)) {
    return c.json({ success: false, error: '無効なアクションタイプです' }, 400)
  }
  
  try {
    const usageInfo = await UsageLimitService.checkActionUsageLimit(user.uid, actionType)
    const recommendation = UsageLimitService.getUpgradeRecommendation(user.plan, actionType)
    
    return c.json({ 
      success: true, 
      ...usageInfo,
      recommendation: !usageInfo.canUse ? recommendation : null
    })
  } catch (error) {
    return c.json({ success: false, error: 'アクション制限チェックに失敗しました' }, 500)
  }
})

// プラン変更
app.post('/api/user/plan', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  try {
    const { plan } = await c.req.json()
    
    if (!['free', 'basic', 'premium'].includes(plan)) {
      return c.json({ success: false, error: '無効なプランです' }, 400)
    }
    
    // プラン変更権限チェック
    if (plan !== user.plan) {
      await UserService.updateUserPlan(user.uid, plan)
      
      return c.json({
        success: true,
        message: `プランが${plan}に変更されました`,
        user: { ...user, plan: plan }
      })
    } else {
      return c.json({
        success: false,
        error: '既に同じプランです'
      }, 400)
    }
    
  } catch (error) {
    return c.json({ success: false, error: 'プラン変更に失敗しました' }, 500)
  }
})

// 管理者用API
import { AdminService } from './services/adminService'

// 管理者権限チェックミドルウェア
const requireAdmin = async (c: any, next: any) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: '管理者ログインが必要です' }, 401)
  }

  // デモ管理者または実際の管理者チェック
  if (user.uid === 'demo-user-123' || await AdminService.checkAdminAccess(user.uid)) {
    return next()
  }

  return c.json({ success: false, error: '管理者権限が必要です' }, 403)
}

// 管理画面ルート
app.get('/admin', requireAdmin, (c) => {
  return c.render(<AdminDashboard />)
})

// 管理者ダッシュボード統計
app.get('/api/admin/stats', requireAdmin, async (c) => {
  try {
    const stats = await AdminService.getDashboardStats()
    return c.json({ success: true, data: stats })
  } catch (error) {
    return c.json({ success: false, error: 'ダッシュボード統計取得に失敗しました' }, 500)
  }
})

// ユーザー一覧取得
app.get('/api/admin/users', requireAdmin, async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const planFilter = c.req.query('plan') as User['plan'] | undefined

    const result = await AdminService.getUsersList(limit, null, planFilter)
    return c.json({ success: true, data: result })
  } catch (error) {
    return c.json({ success: false, error: 'ユーザー一覧取得に失敗しました' }, 500)
  }
})

// ユーザー更新
app.put('/api/admin/users/:uid', requireAdmin, async (c) => {
  try {
    const uid = c.req.param('uid')
    const updates = await c.req.json()

    await AdminService.updateUser(uid, updates)
    return c.json({ success: true, message: 'ユーザー情報を更新しました' })
  } catch (error) {
    return c.json({ success: false, error: 'ユーザー更新に失敗しました' }, 500)
  }
})

// ユーザー削除（論理削除）
app.delete('/api/admin/users/:uid', requireAdmin, async (c) => {
  try {
    const uid = c.req.param('uid')
    await AdminService.deactivateUser(uid)
    return c.json({ success: true, message: 'ユーザーを無効化しました' })
  } catch (error) {
    return c.json({ success: false, error: 'ユーザー削除に失敗しました' }, 500)
  }
})

// 最近のアクティビティ取得
app.get('/api/admin/activity', requireAdmin, async (c) => {
  try {
    const activity = await AdminService.getRecentActivity()
    return c.json({ success: true, data: activity })
  } catch (error) {
    return c.json({ success: false, error: 'アクティビティ取得に失敗しました' }, 500)
  }
})

// 全ユーザー使用回数リセット
app.post('/api/admin/reset-usage', requireAdmin, async (c) => {
  try {
    const result = await AdminService.resetAllUsageCounts()
    return c.json({ 
      success: true, 
      message: `使用回数をリセットしました (成功: ${result.success}, 失敗: ${result.failed})`
    })
  } catch (error) {
    return c.json({ success: false, error: '使用回数リセットに失敗しました' }, 500)
  }
})

// データエクスポート
app.get('/api/admin/export', requireAdmin, async (c) => {
  try {
    const data = await AdminService.exportUserData()
    
    // CSVファイルとして返す
    c.header('Content-Type', 'application/csv')
    c.header('Content-Disposition', 'attachment; filename=users_export.csv')
    
    // CSV形式に変換
    const csvHeader = 'UID,ユーザー名,メールアドレス,プラン,使用回数,最大使用数,登録日,最終ログイン,アクティブ\n'
    const csvRows = data.users.map(user => [
      user.uid,
      user.username,
      user.email,
      user.plan,
      user.usageCount,
      user.maxUsage,
      user.createdAt.toDate().toISOString(),
      user.lastLoginAt.toDate().toISOString(),
      user.isActive
    ].join(','))
    
    return c.text(csvHeader + csvRows.join('\n'))
  } catch (error) {
    return c.json({ success: false, error: 'データエクスポートに失敗しました' }, 500)
  }
})

// ユーザー検索
app.get('/api/admin/users/search', requireAdmin, async (c) => {
  try {
    const searchTerm = c.req.query('q') || ''
    if (searchTerm.length < 2) {
      return c.json({ success: false, error: '検索語句は2文字以上入力してください' }, 400)
    }

    const users = await AdminService.searchUsers(searchTerm)
    return c.json({ success: true, data: users })
  } catch (error) {
    return c.json({ success: false, error: 'ユーザー検索に失敗しました' }, 500)
  }
})

// OpenAI API サービスのインポート
import { 
  analyzeSingleImage, 
  compareImages as compareImagesWithOpenAI, 
  generateCopies as generateCopiesWithOpenAI 
} from './services/openai'

// 認証が不要なページレンダリング設定
app.use(renderer)

// 認証が不要なページルート
app.get('/', (c) => c.render(<HomePage />))
app.get('/login', (c) => c.render(<LoginPage />))

// 採点システムページ（認証不要でテスト）
app.get('/scoring', (c) => {
  // サンプルテストデータ
  const sampleTestItems = [
    {
      id: '1',
      type: 'multiple_choice' as const,
      question: 'JavaScriptにおいて、変数を宣言するためのキーワードとして正しいものはどれですか？',
      options: ['var', 'let', 'const', 'すべて正しい'],
      correctAnswer: 3,
      maxPoints: 10,
      category: 'プログラミング基礎',
      difficulty: 'easy' as const,
      timeLimit: 300
    },
    {
      id: '2', 
      type: 'essay' as const,
      question: 'オブジェクト指向プログラミングの3つの基本原則について説明してください。',
      maxPoints: 20,
      category: 'プログラミング理論',
      difficulty: 'medium' as const,
      timeLimit: 600
    }
  ]
  
  return c.render(<ScoringPage 
    testItems={sampleTestItems}
    currentItem={sampleTestItems[0]}
    score={0}
    maxScore={100}
  />)
})

// 認証ミドルウェア適用（APIと認証不要ページの後に）
app.use('*', authMiddleware)

// 認証が必要なページルート
app.get('/analysis', (c) => c.render(<AnalysisPage />))
app.get('/copy-generation', (c) => c.render(<CopyGenerationPage />))
app.get('/dashboard', (c) => c.render(<UserDashboard />))
app.get('/plans', (c) => c.render(<PlanManagement />))

// OpenAI分析関数（Cloudflare Pages対応）
async function compareImages(base64ImageA: string, base64ImageB: string): Promise<any> {
  // 実際のOpenAI API呼び出し
  return await compareImagesWithOpenAI(base64ImageA, base64ImageB)
}

async function generateCopies(base64Image: string): Promise<any> {
  // 実際のOpenAI API呼び出し
  return await generateCopiesWithOpenAI(base64Image)
}



app.post('/api/analysis/single', async (c) => {
  try {
    // ユーザー認証チェック
    const user = c.get('user')
    if (!user) {
      return c.json({ success: false, error: 'ログインが必要です' }, 401)
    }

    // 使用制限チェック（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      const actionUsageCheck = await UsageLimitService.checkActionUsageLimit(user.uid, 'single_analysis')
      if (!actionUsageCheck.canUse) {
        const recommendation = UsageLimitService.getUpgradeRecommendation(user.plan, 'single_analysis')
        return c.json({ 
          success: false, 
          error: `AI広告診断の月間使用上限に達しました (${actionUsageCheck.actionLimit}回)`,
          usageInfo: actionUsageCheck,
          recommendation
        }, 429)
      }
    }

    // 環境変数デバッグ（Cloudflare Pages対応）
    console.log('Environment check:', {
      hasOpenAIKey_context: !!c.env.OPENAI_API_KEY,
      keyLength_context: c.env.OPENAI_API_KEY?.length || 0,
      keyPrefix_context: c.env.OPENAI_API_KEY?.substring(0, 15) + '...',
      keyType_context: typeof c.env.OPENAI_API_KEY
    });

    // フォームデータから画像ファイルを取得
    const formData = await c.req.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return c.json({ success: false, message: '画像ファイルが選択されていません' }, 400)
    }

    // OpenAI APIキーが設定されているかチェック（Cloudflare Pages対応）
    if (!c.env.OPENAI_API_KEY || c.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('banaAI API Key not configured, using fallback data');
      // フォールバック処理
      throw new Error('banaAI API Key not configured');
    }

    // 画像をBase64エンコード（Cloudflare Workers対応）
    const arrayBuffer = await imageFile.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const base64Image = btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))

    // OpenAI API を使用して画像分析（Cloudflare Pages対応）
    const result = await analyzeSingleImage(base64Image, c.env.OPENAI_API_KEY)
    
    // 使用回数を増加（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      await UserService.incrementUsageCount(user.uid, 'single_analysis')
    }
    
    return c.json({
      success: true,
      result: result,
      user: {
        plan: user.plan,
        usageCount: user.uid !== 'demo-user-123' ? user.usageCount + 1 : user.usageCount,
        maxUsage: user.maxUsage
      }
    })
  } catch (error) {
    console.error('Analysis error:', error)
    const user = c.get('user')
    
    // 使用回数を増加（エラーでもカウント、デモユーザーは除外）
    if (user && user.uid !== 'demo-user-123') {
      try {
        await UserService.incrementUsageCount(user.uid, 'single_analysis')
      } catch (usageError) {
        console.error('Usage increment error:', usageError)
      }
    }
    
    // エラー時はフォールバック（デモデータ）を返す
    return c.json({
      success: true,
      result: {
        totalScore: 82,
        level: '優秀レベル',
        scores: {
          impact: { score: 88, label: '瞬間伝達力', color: '#90EE90' },
          visibility: { score: 79, label: '視認性', color: '#87CEEB' },
          cta: { score: 85, label: '行動喚起', color: '#90EE90' },
          consistency: { score: 81, label: '整合性', color: '#87CEEB' },
          balance: { score: 76, label: '情報バランス', color: '#FFA500' }
        },
        analysis: {
          targetMatch: 91,
          strengths: [
            '視覚階層: メインメッセージが3秒以内に理解可能',
            '色彩バランス: ブランドカラーと可読性の両立が秀逸',
            'CTA配置: 自然な視線誘導でアクション率向上が期待'
          ],
          improvements: [
            'テキストコントラスト: 明度を15%向上で可読性UP',
            '余白調整: 左右マージンを1.2倍に拡張',
            'フォントサイズ: キャッチコピーを24px→28pxに'
          ],
          performance: {
            clickRate: { current: 3.2, improved: 4.1, change: 28 },
            conversionRate: { current: 1.8, improved: 2.3, change: 27 },
            brandAwareness: { change: 34 }
          }
        },
        note: 'banaAI APIデモモード：サンプル解析データを表示しています'
      }
    })
  }
})

app.post('/api/analysis/compare', async (c) => {
  try {
    // ユーザー認証チェック
    const user = c.get('user')
    if (!user) {
      return c.json({ success: false, error: 'ログインが必要です' }, 401)
    }

    // 使用制限チェック（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      const actionUsageCheck = await UsageLimitService.checkActionUsageLimit(user.uid, 'ab_comparison')
      if (!actionUsageCheck.canUse) {
        const recommendation = UsageLimitService.getUpgradeRecommendation(user.plan, 'ab_comparison')
        return c.json({ 
          success: false, 
          error: `A/B比較分析の月間使用上限に達しました (${actionUsageCheck.actionLimit}回)`,
          usageInfo: actionUsageCheck,
          recommendation
        }, 429)
      }
    }

    // フォームデータから2つの画像ファイルを取得
    const formData = await c.req.formData()
    const imageFileA = formData.get('imageA') as File
    const imageFileB = formData.get('imageB') as File
    
    if (!imageFileA || !imageFileB) {
      return c.json({ success: false, message: '2つの画像ファイルが必要です' }, 400)
    }

    // 画像AをBase64エンコード（Cloudflare Workers対応）
    const arrayBufferA = await imageFileA.arrayBuffer()
    const uint8ArrayA = new Uint8Array(arrayBufferA)
    const base64ImageA = btoa(String.fromCharCode.apply(null, Array.from(uint8ArrayA)))

    // 画像BをBase64エンコード（Cloudflare Workers対応）
    const arrayBufferB = await imageFileB.arrayBuffer()
    const uint8ArrayB = new Uint8Array(arrayBufferB)
    const base64ImageB = btoa(String.fromCharCode.apply(null, Array.from(uint8ArrayB)))

    // OpenAI API を使用してA/B比較分析
    const result = await compareImages(base64ImageA, base64ImageB, c.env.OPENAI_API_KEY)
    
    // 使用回数を増加（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      await UserService.incrementUsageCount(user.uid, 'ab_comparison')
    }
    
    return c.json({
      success: true,
      result: result,
      user: {
        plan: user.plan,
        usageCount: user.uid !== 'demo-user-123' ? user.usageCount + 1 : user.usageCount,
        maxUsage: user.maxUsage
      }
    })
  } catch (error) {
    console.error('AB comparison error:', error)
    const user = c.get('user')
    
    // 使用回数を増加（エラーでもカウント、デモユーザーは除外）
    if (user && user.uid !== 'demo-user-123') {
      try {
        await UserService.incrementUsageCount(user.uid, 'ab_comparison')
      } catch (usageError) {
        console.error('Usage increment error:', usageError)
      }
    }
    
    // エラー時はフォールバック（デモデータ）を返す
    return c.json({
      success: true,
      result: {
        winner: 'A',
        confidence: 92.4,
        cvrImprovement: 24.3,
        sampleSize: 1000,
        patternA: {
          score: 87,
          scores: {
            impact: { score: 92, label: '瞬間伝達力', color: '#90EE90' },
            visibility: { score: 85, label: '視認性', color: '#90EE90' },
            cta: { score: 88, label: '行動喚起', color: '#90EE90' },
            consistency: { score: 84, label: '整合性', color: '#87CEEB' },
            balance: { score: 86, label: 'バランス', color: '#90EE90' }
          }
        },
        patternB: {
          score: 75,
          scores: {
            impact: { score: 71, label: '瞬間伝達力', color: '#FFA500' },
            visibility: { score: 78, label: '視認性', color: '#87CEEB' },
            cta: { score: 73, label: '行動喚起', color: '#FFA500' },
            consistency: { score: 77, label: '整合性', color: '#87CEEB' },
            balance: { score: 76, label: 'バランス', color: '#87CEEB' }
          }
        },
        analysis: {
          advantages: [
            '瞬間伝達力 +21点: メインメッセージの視認性が圧倒的に高い',
            '行動喚起 +15点: CTAボタンの配色・配置が最適化されている',
            '整合性 +7点: ブランド一貫性とユーザー期待値が合致'
          ],
          improvements: [
            '文字階層の見直しが必要（情報の優先度が不明確）',
            'CTAの視認性向上（背景との対比不足）',
            '全体的な情報密度の調整が推奨'
          ],
          expectedResults: {
            currentCvr: 2.1,
            improvedCvr: 2.6,
            additionalConversions: 12,
            roiImprovement: 18.2,
            cpaReduction: 19.5
          }
        },
        note: 'banaAI APIデモモード：サンプル解析データを表示しています'
      }
    })
  }
})

app.post('/api/copy-generation', async (c) => {
  try {
    // ユーザー認証チェック
    const user = c.get('user')
    if (!user) {
      return c.json({ success: false, error: 'ログインが必要です' }, 401)
    }

    // 使用制限チェック（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      const actionUsageCheck = await UsageLimitService.checkActionUsageLimit(user.uid, 'copy_generation')
      if (!actionUsageCheck.canUse) {
        const recommendation = UsageLimitService.getUpgradeRecommendation(user.plan, 'copy_generation')
        return c.json({ 
          success: false, 
          error: `AIコピー生成の月間使用上限に達しました (${actionUsageCheck.actionLimit}回)`,
          usageInfo: actionUsageCheck,
          recommendation
        }, 429)
      }
    }

    // フォームデータから画像ファイルを取得
    const formData = await c.req.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return c.json({ success: false, message: '画像ファイルが選択されていません' }, 400)
    }

    // 画像をBase64エンコード（Cloudflare Workers対応）
    const arrayBuffer = await imageFile.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const base64Image = btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))

    // OpenAI API を使用してコピー生成
    const result = await generateCopies(base64Image, c.env.OPENAI_API_KEY)
    
    // 使用回数を増加（デモユーザーは除外）
    if (user.uid !== 'demo-user-123') {
      await UserService.incrementUsageCount(user.uid, 'copy_generation')
    }
    
    return c.json({
      success: true,
      result: result,
      user: {
        plan: user.plan,
        usageCount: user.uid !== 'demo-user-123' ? user.usageCount + 1 : user.usageCount,
        maxUsage: user.maxUsage
      }
    })
  } catch (error) {
    console.error('Copy generation error:', error)
    const user = c.get('user')
    
    // 使用回数を増加（エラーでもカウント、デモユーザーは除外）
    if (user && user.uid !== 'demo-user-123') {
      try {
        await UserService.incrementUsageCount(user.uid, 'copy_generation')
      } catch (usageError) {
        console.error('Usage increment error:', usageError)
      }
    }
    
    // エラー時はフォールバック（デモデータ）を返す
    return c.json({
      success: true,
      result: {
        copies: [
          {
            id: 1,
            type: 'メインコピー',
            text: '美肌への近道、ここにあり。今すぐ体験してください。',
            effectiveness: 92,
            reasoning: '緊急性と具体的なベネフィットを組み合わせた効果的なコピー'
          },
          {
            id: 2,
            type: 'キャッチコピー',
            text: '3日で実感！輝く美肌を手に入れる秘密',
            effectiveness: 89,
            reasoning: '数字による具体性と期待感を高める表現が効果的'
          },
          {
            id: 3,
            type: 'CTAコピー',
            text: '限定価格で今すぐ始める',
            effectiveness: 87,
            reasoning: '限定性と行動喚起を組み合わせた強力なCTA'
          },
          {
            id: 4,
            type: 'サブコピー',
            text: '94%のユーザーが満足した美容メソッド',
            effectiveness: 85,
            reasoning: '社会的証明による信頼性向上'
          }
        ],
        analysis: {
          overallScore: 88,
          industryMatch: 95,
          targetAudience: '美容意識の高い20-40代女性',
          recommendations: [
            'メインコピーを最も目立つ位置に配置',
            'CTAボタンに「限定価格で今すぐ始める」を使用',
            'サブコピーで信頼性を補完'
          ]
        },
        note: 'banaAI APIデモモード：サンプル解析データを表示しています'
      }
    })
  }
})

export default app