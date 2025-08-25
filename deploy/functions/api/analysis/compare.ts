import { Hono } from 'hono'
import OpenAI from 'openai'

type Env = { 
  OPENAI_API_KEY: string
  PING: string 
}

const app = new Hono<{ Bindings: Env }>()

// A/B比較分析用プロンプト
const AB_COMPARISON_PROMPT = `
あなたは広告バナーA/B比較分析の専門家です。2つのバナー画像を比較分析し、どちらが効果的かをJSONフォーマットで返してください。

## 分析項目
1. **瞬間伝達力 (impact)**: 3秒以内にメッセージが理解できるか
2. **視認性 (visibility)**: 文字の読みやすさ、色彩バランス
3. **行動喚起 (cta)**: CTAの明確さ、効果的な配置
4. **整合性 (consistency)**: 画像と文字の一致度
5. **情報バランス (balance)**: 情報過多の回避

## 出力形式 (JSON)
{
  "winner": "A",
  "confidence": 92.4,
  "cvrImprovement": 24.3,
  "sampleSize": 1000,
  "patternA": {
    "score": 87,
    "scores": {
      "impact": { "score": 92, "label": "瞬間伝達力", "color": "#90EE90" },
      "visibility": { "score": 85, "label": "視認性", "color": "#90EE90" },
      "cta": { "score": 88, "label": "行動喚起", "color": "#90EE90" },
      "consistency": { "score": 84, "label": "整合性", "color": "#87CEEB" },
      "balance": { "score": 86, "label": "バランス", "color": "#90EE90" }
    }
  },
  "patternB": {
    "score": 75,
    "scores": {
      "impact": { "score": 71, "label": "瞬間伝達力", "color": "#FFA500" },
      "visibility": { "score": 78, "label": "視認性", "color": "#87CEEB" },
      "cta": { "score": 73, "label": "行動喚起", "color": "#FFA500" },
      "consistency": { "score": 77, "label": "整合性", "color": "#87CEEB" },
      "balance": { "score": 76, "label": "バランス", "color": "#87CEEB" }
    }
  },
  "analysis": {
    "advantages": [
      "瞬間伝達力 +21点: メインメッセージの視認性が圧倒的に高い",
      "行動喚起 +15点: CTAボタンの配色・配置が最適化されている"
    ],
    "improvements": [
      "文字階層の見直しが必要（情報の優先度が不明確）",
      "CTAの視認性向上（背景との対比不足）"
    ],
    "expectedResults": {
      "currentCvr": 2.1,
      "improvedCvr": 2.6,
      "additionalConversions": 12,
      "roiImprovement": 18.2,
      "cpaReduction": 19.5
    }
  }
}

必ず有効なJSONのみを返してください。
`

// A/B比較分析
async function compareImages(openai: OpenAI, base64ImageA: string, base64ImageB: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user", 
          content: [
            { type: "text", text: AB_COMPARISON_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64ImageA}`
              }
            },
            {
              type: "text",
              text: "上記がパターンA、下記がパターンBです。"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64ImageB}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.1
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI API response is empty')
    }

    try {
      return JSON.parse(content)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.log('Raw response:', content)
      throw new Error('OpenAI API returned invalid JSON')
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

app.post('*', async (c) => {
  try {
    // 環境変数チェック
    const apiKey = c.env.OPENAI_API_KEY
    if (!apiKey) {
      return c.json({ 
        success: false, 
        error: 'OPENAI_API_KEY not configured',
        debug: {
          env_keys: Object.keys(c.env || {}),
          env_count: Object.keys(c.env || {}).length
        }
      }, 500)
    }

    // OpenAI クライアント初期化
    const openai = new OpenAI({
      apiKey: apiKey
    })

    // フォームデータの解析
    const formData = await c.req.formData()
    const imageFileA = formData.get('imageA') as File
    const imageFileB = formData.get('imageB') as File

    if (!imageFileA || !imageFileB) {
      return c.json({ 
        success: false, 
        error: 'Both imageA and imageB files are required' 
      }, 400)
    }

    // 画像をBase64に変換
    const arrayBufferA = await imageFileA.arrayBuffer()
    const base64A = Buffer.from(arrayBufferA).toString('base64')
    
    const arrayBufferB = await imageFileB.arrayBuffer()
    const base64B = Buffer.from(arrayBufferB).toString('base64')

    // OpenAI Vision API で比較分析
    const result = await compareImages(openai, base64A, base64B)

    return c.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('A/B comparison analysis error:', error)
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        timestamp: new Date().toISOString(),
        environment: 'pages-function'
      }
    }, 500)
  }
})

export const onRequest = app.fetch