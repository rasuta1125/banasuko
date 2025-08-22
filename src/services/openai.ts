import OpenAI from 'openai'

// OpenAI API クライアント設定（Cloudflare Workers対応）
function createOpenAIClient(apiKey: string) {
  return new OpenAI({
    apiKey: apiKey,
  })
}

// 画像をBase64エンコード
export async function encodeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// バナー分析用プロンプト
export const ANALYSIS_PROMPT = `
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

// A/B比較分析用プロンプト
export const AB_COMPARISON_PROMPT = `
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

// コピー生成用プロンプト
export const COPY_GENERATION_PROMPT = `
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

// 単一画像分析
export async function analyzeSingleImage(base64Image: string, apiKey?: string): Promise<any> {
  try {
    const openai = createOpenAIClient(apiKey || process.env.OPENAI_API_KEY || '')
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

// A/B比較分析
export async function compareImages(base64ImageA: string, base64ImageB: string, apiKey?: string): Promise<any> {
  try {
    const openai = createOpenAIClient(apiKey || process.env.OPENAI_API_KEY || '')
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

// コピー生成
export async function generateCopies(base64Image: string, apiKey?: string): Promise<any> {
  try {
    const openai = createOpenAIClient(apiKey || process.env.OPENAI_API_KEY || '')
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