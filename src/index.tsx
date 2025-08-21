import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import { AnalysisPage } from './components/AnalysisPage'
import { CopyGenerationPage } from './components/CopyGenerationPage'

const app = new Hono()

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
app.post('/api/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json()
    
    // デモアカウント認証
    if (username === 'demo' && password === 'demo123') {
      return c.json({ 
        success: true, 
        user: { 
          username: 'demo', 
          name: 'デモユーザー',
          email: 'demo@example.com'
        },
        token: 'demo-token-123'
      })
    }
    
    return c.json({ success: false, message: 'ログイン情報が正しくありません' }, 401)
  } catch (error) {
    return c.json({ success: false, message: 'サーバーエラーが発生しました' }, 500)
  }
})

app.post('/api/auth/register', async (c) => {
  try {
    const { username, email, password } = await c.req.json()
    
    // 簡単な登録処理（実際の実装ではデータベースに保存）
    return c.json({ 
      success: true, 
      message: 'アカウントが作成されました',
      user: { username, email }
    })
  } catch (error) {
    return c.json({ success: false, message: 'サーバーエラーが発生しました' }, 500)
  }
})

app.post('/api/analysis/single', async (c) => {
  try {
    // デモ分析結果を返す
    await new Promise(resolve => setTimeout(resolve, 3000)) // 3秒待機
    
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
        }
      }
    })
  } catch (error) {
    return c.json({ success: false, message: 'AI分析でエラーが発生しました' }, 500)
  }
})

app.post('/api/analysis/compare', async (c) => {
  try {
    // A/B比較のデモ結果を返す
    await new Promise(resolve => setTimeout(resolve, 4000)) // 4秒待機
    
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
        }
      }
    })
  } catch (error) {
    return c.json({ success: false, message: 'A/B比較分析でエラーが発生しました' }, 500)
  }
})

app.post('/api/copy-generation', async (c) => {
  try {
    // デモコピー生成結果を返す
    await new Promise(resolve => setTimeout(resolve, 3500)) // 3.5秒待機
    
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
        }
      }
    })
  } catch (error) {
    return c.json({ success: false, message: 'コピー生成でエラーが発生しました' }, 500)
  }
})

export default app