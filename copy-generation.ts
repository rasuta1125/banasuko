import { Hono } from 'hono'
import OpenAI from 'openai'

type Env = { 
  OPENAI_API_KEY: string
  PING: string 
}

const app = new Hono<{ Bindings: Env }>()

// コピー生成用プロンプト
const COPY_GENERATION_PROMPT = `
アップロードされたバナー画像を分析し、効果的な広告コピーを4種類生成してください。

## 生成するコピータイプ
1. **メインコピー**: 主要メッセージ (20-30文字)
2. **キャッチコピー**: 注目を引くフレーズ (15-25文字)  
3. **CTAコピー**: 行動喚起ボタン文言 (5-15文字)
4. **サブコピー**: 補足説明文 (30-50文字)

## 業界別考慮事項
- **美容**: 薬機法準拠・効果効能表現の適正化
- **飲食**: 食品表示法対応・魅力的な味覚表現
- **不動産**: 宅建業法準拠・立地/設備の訴求
- **子ども写真館**: 家族向け・記念日訴求

## 出力形式 (JSON)
{
  "copies": [
    {
      "id": 1,
      "type": "メインコピー",
      "text": "美肌への近道、ここにあり。今すぐ体験してください。",
      "effectiveness": 92,
      "reasoning": "緊急性と具体的なベネフィットを組み合わせた効果的なコピー"
    },
    {
      "id": 2,
      "type": "キャッチコピー", 
      "text": "3日で実感！輝く美肌を手に入れる秘密",
      "effectiveness": 89,
      "reasoning": "数字による具体性と期待感を高める表現が効果的"
    },
    {
      "id": 3,
      "type": "CTAコピー",
      "text": "限定価格で今すぐ始める",
      "effectiveness": 87,
      "reasoning": "限定性と行動喚起を組み合わせた強力なCTA"
    },
    {
      "id": 4,
      "type": "サブコピー",
      "text": "94%のユーザーが満足した美容メソッド",
      "effectiveness": 85,
      "reasoning": "社会的証明による信頼性向上"
    }
  ],
  "analysis": {
    "overallScore": 88,
    "industryMatch": 95,
    "targetAudience": "美容意識の高い20-40代女性",
    "recommendations": [
      "メインコピーを最も目立つ位置に配置",
      "CTAボタンに「限定価格で今すぐ始める」を使用",
      "サブコピーで信頼性を補完"
    ]
  }
}

必ず有効なJSONのみを返してください。
`

// コピー生成
async function generateCopies(openai: OpenAI, base64Image: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: COPY_GENERATION_PROMPT },
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
      temperature: 0.3
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
    const imageFile = formData.get('image') as File

    if (!imageFile) {
      return c.json({ success: false, error: 'No image file provided' }, 400)
    }

    // 画像をBase64に変換
    const arrayBuffer = await imageFile.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // OpenAI Vision API でコピー生成
    const result = await generateCopies(openai, base64)

    return c.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Copy generation error:', error)
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