import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string 
}
import { renderer } from './renderer'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import { AnalysisPage } from './components/AnalysisPage'
import { CopyGenerationPage } from './components/CopyGenerationPage'
// OpenAI クライアント初期化をcontext内で行うため、インポートのみ
import OpenAI from 'openai'
import { ANALYSIS_PROMPT, AB_COMPARISON_PROMPT, COPY_GENERATION_PROMPT } from './services/openai'

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('/api/*', cors())

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './public' }))

// レンダラー設定
app.use(renderer)

// ルート設定
app.get('/', (c) => {
  return c.render(<HomePage />)
})

app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

app.get('/analysis', (c) => {
  return c.render(<AnalysisPage />)
})

app.get('/copy-generation', (c) => {
  return c.render(<CopyGenerationPage />)
})

// API エンドポイント
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

// 認証ミドルウェア適用
app.use('*', authMiddleware)

// デモログイン（既存）
app.post('/api/auth/demo-login', handleDemoLogin)

// Firebase認証ログイン
app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    
    // デモアカウントかFirebase認証かを判定
    if (body.username === 'demo' && body.password === 'demo123') {
      return handleDemoLogin(c)
    } else if (body.email && body.password) {
      // Firebase認証
      return handleFirebaseLogin(c)
    } else {
      return c.json({ 
        success: false, 
        error: 'メールアドレス・パスワードまたはデモアカウント情報を入力してください' 
      }, 400)
    }
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ success: false, error: 'ログインに失敗しました' }, 500)
  }
})

// Firebase認証登録
app.post('/api/auth/register', handleFirebaseRegister)

// ログアウト
app.post('/api/auth/logout', handleLogout)

// ユーザー情報取得
app.get('/api/auth/user', async (c) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ success: false, error: 'ログインが必要です' }, 401)
  }
  
  return c.json({ success: true, user })
})

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
    const { newPlan } = await c.req.json()
    
    if (!['free', 'basic', 'premium'].includes(newPlan)) {
      return c.json({ success: false, error: '無効なプランです' }, 400)
    }
    
    // プラン変更権限チェック
    if (newPlan !== user.plan) {
      await UserService.updateUserPlan(user.uid, newPlan)
      
      return c.json({
        success: true,
        message: `プランが${newPlan}に変更されました`,
        user: { ...user, plan: newPlan }
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

// OpenAI分析関数（Cloudflare Pages対応）
async function analyzeSingleImageWithClient(openai: OpenAI, base64Image: string): Promise<any> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: ANALYSIS_PROMPT },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 1500,
    temperature: 0.1
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI API response is empty');
  }

  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    console.log('Raw response:', content);
    throw new Error('OpenAI API returned invalid JSON');
  }
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
      hasOpenAIKey_process: !!process.env.OPENAI_API_KEY,
      hasOpenAIKey_context: !!c.env.OPENAI_API_KEY,
      keyLength_context: c.env.OPENAI_API_KEY?.length || 0,
      keyPrefix_context: c.env.OPENAI_API_KEY?.substring(0, 15) + '...',
      keyType_context: typeof c.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV
    });

    // フォームデータから画像ファイルを取得
    const formData = await c.req.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return c.json({ success: false, message: '画像ファイルが選択されていません' }, 400)
    }

    // OpenAI APIキーが設定されているかチェック（Cloudflare Pages対応）
    if (!c.env.OPENAI_API_KEY || c.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('OpenAI API Key not configured, using fallback data');
      // フォールバック処理
      throw new Error('OpenAI API Key not configured');
    }

    // 画像をBase64エンコード
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(imageFile)
    })

    // OpenAI API を使用して画像分析（Cloudflare Pages対応）
    const openai = new OpenAI({ apiKey: c.env.OPENAI_API_KEY });
    const result = await analyzeSingleImageWithClient(openai, base64Image)
    
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
        note: 'OpenAI API未接続のため、デモデータを表示しています'
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

    // 画像AをBase64エンコード
    const base64ImageA = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(imageFileA)
    })

    // 画像BをBase64エンコード
    const base64ImageB = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(imageFileB)
    })

    // OpenAI API を使用してA/B比較分析
    const result = await compareImages(base64ImageA, base64ImageB)
    
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
        note: 'OpenAI API未接続のため、デモデータを表示しています'
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

    // 画像をBase64エンコード
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(imageFile)
    })

    // OpenAI API を使用してコピー生成
    const result = await generateCopies(base64Image)
    
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
        note: 'OpenAI API未接続のため、デモデータを表示しています'
      }
    })
  }
})

export default app