import { Hono } from 'hono'
import OpenAI from 'openai'

type Env = { 
  OPENAI_API_KEY: string
  PING: string 
}

const app = new Hono<{ Bindings: Env }>()

// バナー分析用プロンプト
const ANALYSIS_PROMPT = `
あなたは広告バナー分析の専門家です。アップロードされたバナー画像を以下の5項目で分析し、JSONフォーマットで結果を返してください。

## 分析項目
1. **瞬間伝達力 (impact)**: 3秒以内にメッセージが理解できるか (0-100点)
2. **視認性 (visibility)**: 文字の読みやすさ、色彩バランス (0-100点)  
3. **行動喚起 (cta)**: CTAの明確さ、効果的な配置 (0-100点)
4. **整合性 (consistency)**: 画像と文字の一致度、ブランド統一性 (0-100点)
5. **情報バランス (balance)**: 情報過多の回避、適切な情報量 (0-100点)

## 出力形式 (JSON)
{
  "totalScore": 82,
  "level": "優秀レベル",
  "scores": {
    "impact": { "score": 88, "label": "瞬間伝達力", "color": "#90EE90" },
    "visibility": { "score": 79, "label": "視認性", "color": "#87CEEB" },
    "cta": { "score": 85, "label": "行動喚起", "color": "#90EE90" },
    "consistency": { "score": 81, "label": "整合性", "color": "#87CEEB" },
    "balance": { "score": 76, "label": "情報バランス", "color": "#FFA500" }
  },
  "analysis": {
    "targetMatch": 91,
    "strengths": [
      "視覚階層: メインメッセージが3秒以内に理解可能",
      "色彩バランス: ブランドカラーと可読性の両立が秀逸",
      "CTA配置: 自然な視線誘導でアクション率向上が期待"
    ],
    "improvements": [
      "テキストコントラスト: 明度を15%向上で可読性UP",
      "余白調整: 左右マージンを1.2倍に拡張",
      "フォントサイズ: キャッチコピーを24px→28pxに"
    ],
    "performance": {
      "clickRate": { "current": 3.2, "improved": 4.1, "change": 28 },
      "conversionRate": { "current": 1.8, "improved": 2.3, "change": 27 },
      "brandAwareness": { "change": 34 }
    }
  }
}

## スコア基準
- 90-100点: 優秀レベル (色: #90EE90)
- 80-89点: 良好レベル (色: #87CEEB)  
- 70-79点: 標準レベル (色: #FFA500)
- 60-69点: 改善必要 (色: #FF6B6B)
- 0-59点: 要改善 (色: #FF4444)

必ず有効なJSONのみを返し、説明文は含めないでください。
`

// 単一画像分析
async function analyzeSingleImage(openai: OpenAI, base64Image: string): Promise<any> {
  try {
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
      timeout: 60000, // 60秒タイムアウト追加
      temperature: 0.1
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI API response is empty')
    }

    // JSONパースを試行
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
    const imageFile = formData.get('image') as File

    if (!imageFile) {
      return c.json({ success: false, error: 'No image file provided' }, 400)
    }

    // ファイル形式とサイズの検証
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(imageFile.type)) {
      return c.json({ 
        success: false, 
        error: `Unsupported file type: ${imageFile.type}. Only JPEG, JPG, and PNG are supported.` 
      }, 400)
    }

    if (imageFile.size > maxSize) {
      return c.json({ 
        success: false, 
        error: `File too large: ${imageFile.size} bytes. Maximum size is ${maxSize} bytes.` 
      }, 400)
    }

    // 画像をBase64に変換
    const arrayBuffer = await imageFile.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // より安全なBase64変換
    let base64 = ''
    for (let i = 0; i < uint8Array.length; i++) {
      base64 += String.fromCharCode(uint8Array[i])
    }
    base64 = btoa(base64)

    // OpenAI Vision API で分析
    const result = await analyzeSingleImage(openai, base64)

    return c.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Single image analysis error:', error)
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        timestamp: new Date().toISOString(),
        environment: 'pages-function',
        errorType: error.constructor.name,
        stack: error instanceof Error ? error.stack : undefined
      }
    }, 500)
  }
})

export const onRequest = app.fetch
