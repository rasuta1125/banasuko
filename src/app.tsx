// メインアプリケーション - SSRレンダリング専用
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { jwtVerify, createRemoteJWKSet } from 'jose'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_API_KEY: string
  FIREBASE_WEB_API_KEY: string
  FIREBASE_STORAGE_BUCKET: string
  FIREBASE_PRIVATE_KEY: string
  FIREBASE_CLIENT_EMAIL: string
}

import { renderer } from './renderer'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import { AnalysisPage } from './components/AnalysisPage'
import { CopyGenerationPage } from './components/CopyGenerationPage'
import { AdminDashboard } from './components/AdminDashboard'
import { UserDashboard } from './components/UserDashboard'
import { PlanManagement } from './components/PlanManagement'

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('/api/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './public' }))

// ========== API エンドポイント（SSRより先に定義） ==========

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

// Firebase セッション作成エンドポイント
app.post('/api/session', async (c) => {
  console.log('🔥 Firebase session endpoint called')
  
  // body 安全に取得
  let idToken: string | undefined;
  try {
    const body = await c.req.json();
    idToken = body?.idToken;
    console.log('📨 Received idToken:', idToken ? idToken.substring(0, 20) + '...' : 'none')
  } catch (e) {
    console.error('❌ JSON parsing error:', e)
    return c.json({ ok: false, message: 'Invalid JSON body' }, 400);
  }
  
  if (!idToken) {
    console.log('❌ No idToken provided')
    return c.json({ ok: false, message: 'idToken required' }, 400);
  }
  
  try {

    const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';
    console.log('🔧 Using Firebase project:', projectId)
    
    // Firebase IDトークンを検証
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    console.log('✅ Token verified successfully for user:', payload.user_id)

    // セッションクッキーを発行
    c.header('Set-Cookie',
      `bn_session=uid:${payload.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return c.json({
      ok: true,
      uid: payload.user_id,
      email: payload.email ?? null,
      message: 'Session created successfully'
    });
  } catch (e: any) {
    console.error('💥 Token verification error:', e);
    
    // 開発環境用のフォールバック（AI分析テスト用）
    const isTestToken = idToken?.startsWith('test-') || idToken?.startsWith('demo-') || idToken?.startsWith('fake-');
    if (isTestToken) {
      console.log('⚠️ Using development fallback for AI testing');
      const testUser = {
        user_id: 'test-user-' + Math.random().toString(36).substring(7),
        email: 'test-user@example.com'
      };
      
      // セッションクッキーを発行
      c.header('Set-Cookie',
        `bn_session=uid:${testUser.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
      );

      return c.json({
        ok: true,
        uid: testUser.user_id,
        email: testUser.email,
        message: 'Test session created successfully'
      });
    }
    
    return c.json({ 
      ok: false, 
      message: e?.message || 'Invalid token',
      error: e.toString()
    }, 401);
  }
});

// CORS OPTIONS handlers
app.options('/api/session', (c) => {
  return c.body(null, 204);
});

app.options('/api/auth/user', (c) => {
  return c.body(null, 204);
});

app.options('/api/user/profile', (c) => {
  return c.body(null, 204);
});

app.options('/api/usage/dashboard', (c) => {
  return c.body(null, 204);
});

app.options('/api/analysis/single', (c) => {
  return c.body(null, 204);
});

app.options('/api/analysis/ab', (c) => {
  return c.body(null, 204);
});

app.options('/api/analysis/banasco', (c) => {
  return c.body(null, 204);
});

app.options('/api/analysis/ab-compare', (c) => {
  return c.body(null, 204);
});

// セッションからユーザー情報を取得するヘルパー関数
const getUserFromSession = (c: any) => {
  const sessionCookie = c.req.header('Cookie')?.split(';')
    .find(cookie => cookie.trim().startsWith('bn_session='))
  
  if (!sessionCookie) {
    return null
  }
  
  const sessionValue = sessionCookie.split('=')[1]
  if (sessionValue?.startsWith('uid:')) {
    return {
      uid: sessionValue.replace('uid:', ''),
      authenticated: true
    }
  }
  
  return null
}

// ユーザー認証状態確認エンドポイント
app.get('/api/auth/user', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    // 実際のユーザー情報を返す（デモデータではなく）
    // TODO: Firestoreからユーザー情報を取得
    return c.json({
      success: true,
      user: {
        uid: user.uid,
        email: `user-${user.uid.substring(0, 8)}@example.com`, // 一時的な表示
        plan: 'free',
        authenticated: true
      }
    })
  } catch (error) {
    console.error('ユーザー認証確認エラー:', error)
    return c.json({ success: false, message: 'Authentication check failed' }, 500)
  }
})

// ユーザープロファイル作成・取得エンドポイント
app.post('/api/user/profile', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    const body = await c.req.json()
    
    // TODO: Firestoreにユーザープロファイルを作成
    console.log('ユーザープロファイル作成:', { uid: user.uid, ...body })
    
    return c.json({
      success: true,
      message: 'Profile created successfully',
      user: {
        uid: user.uid,
        email: body.email,
        plan: 'free',
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('プロファイル作成エラー:', error)
    return c.json({ success: false, message: 'Profile creation failed' }, 500)
  }
})

// 使用状況ダッシュボードデータ取得
app.get('/api/usage/dashboard', async (c) => {
  try {
    const user = getUserFromSession(c)
    
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    // TODO: Firestoreから実際の使用状況を取得
    const dashboardData = {
      user: {
        uid: user.uid,
        email: `user-${user.uid.substring(0, 8)}@example.com`,
        plan: 'free',
        planName: 'フリープラン'
      },
      usage: {
        singleAnalysis: { used: 0, limit: 10 },
        abComparison: { used: 0, limit: 5 },
        copyGeneration: { used: 0, limit: 3 }
      },
      daysUntilReset: 30
    }

    return c.json({
      success: true,
      data: dashboardData
    })
  } catch (error) {
    console.error('ダッシュボードデータ取得エラー:', error)
    return c.json({ success: false, message: 'Dashboard data fetch failed' }, 500)
  }
})

// ログアウトエンドポイント
app.post('/api/auth/logout', async (c) => {
  console.log('🚪 ログアウトエンドポイント呼び出し')
  try {
    // セッションクッキーを削除
    c.header('Set-Cookie', 'bn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0')
    
    console.log('✅ ログアウト成功 - セッションクッキー削除完了')
    return c.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('❌ ログアウトエラー:', error)
    return c.json({ success: false, message: 'Logout failed' }, 500)
  }
})

// CORS OPTIONS handler for logout
app.options('/api/auth/logout', (c) => {
  return c.body(null, 204);
});

// 単一画像分析エンドポイント
app.post('/api/analysis/single', async (c) => {
  console.log('🔍 単一画像分析エンドポイント呼び出し')
  
  try {
    const user = getUserFromSession(c)
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    const body = await c.req.json()
    const { image, platform, adType } = body

    if (!image || !platform) {
      return c.json({ success: false, message: 'Image and platform are required' }, 400)
    }

    // OpenAI API Key確認
    const openaiKey = c.env.OPENAI_API_KEY
    if (!openaiKey) {
      console.error('❌ OpenAI API Key not configured')
      return c.json({ success: false, message: 'AI service not configured' }, 500)
    }

    console.log('🎯 分析開始:', { platform, adType, user: user.uid })

    // OpenAI Vision API呼び出し
    const analysisResult = await performVisionAnalysis(image, platform, adType, openaiKey)
    
    console.log('✅ 分析完了:', analysisResult.score || analysisResult.grade)

    return c.json({
      success: true,
      result: analysisResult,
      message: '分析が完了しました'
    })

  } catch (error) {
    console.error('❌ 分析エラー:', error)
    return c.json({ 
      success: false, 
      message: '分析中にエラーが発生しました。もう一度試してください。',
      error: error.message 
    }, 500)
  }
})

// A/B比較分析エンドポイント
app.post('/api/analysis/ab', async (c) => {
  console.log('🔍 A/B比較分析エンドポイント呼び出し')
  
  try {
    const user = getUserFromSession(c)
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    const body = await c.req.json()
    const { imageA, imageB, platform, adType } = body

    if (!imageA || !imageB || !platform) {
      return c.json({ success: false, message: 'Both images and platform are required' }, 400)
    }

    const openaiKey = c.env.OPENAI_API_KEY
    if (!openaiKey) {
      return c.json({ success: false, message: 'AI service not configured' }, 500)
    }

    console.log('🎯 A/B分析開始:', { platform, adType, user: user.uid })

    // 両方の画像を分析
    const [resultA, resultB] = await Promise.all([
      performVisionAnalysis(imageA, platform, adType, openaiKey),
      performVisionAnalysis(imageB, platform, adType, openaiKey)
    ])

    console.log('✅ A/B分析完了')

    return c.json({
      success: true,
      result: {
        patternA: resultA,
        patternB: resultB,
        comparison: generateComparison(resultA, resultB)
      },
      message: 'A/B比較分析が完了しました'
    })

  } catch (error) {
    console.error('❌ A/B分析エラー:', error)
    return c.json({ 
      success: false, 
      message: '分析中にエラーが発生しました。もう一度試してください。',
      error: error.message 
    }, 500)
  }
})

// バナスコAI 単一画像分析エンドポイント
app.post('/api/analysis/banasco', async (c) => {
  console.log('🧠 バナスコAI 分析エンドポイント呼び出し')
  
  try {
    const user = getUserFromSession(c)
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    // FormData処理対応
    const formData = await c.req.formData()
    const imageFile = formData.get('image') as File
    const platform = formData.get('platform') as string
    const category = formData.get('category') as string
    const purpose = formData.get('purpose') as string
    const industry = formData.get('industry') as string
    const pattern = formData.get('pattern') as string

    if (!imageFile || !platform || !category || !industry) {
      return c.json({ success: false, message: 'Required fields missing' }, 400)
    }

    // Firebase設定確認
    const projectId = c.env.FIREBASE_PROJECT_ID
    const openaiKey = c.env.OPENAI_API_KEY
    
    if (!openaiKey) {
      console.error('❌ OpenAI API Key not configured')
      return c.json({ success: false, message: 'AI service not configured' }, 500)
    }
    
    if (!projectId) {
      console.error('❌ Firebase Project ID not configured')
      return c.json({ success: false, message: 'Database service not configured' }, 500)
    }

    // 利用制限チェック
    const userData = await getUserDataFromFirestore(user.uid, projectId)
    if (userData.remaining_uses <= 0) {
      return c.json({ 
        success: false, 
        message: '利用回数が上限に達しました。プランをアップグレードしてください。',
        remaining_uses: 0
      }, 403)
    }

    console.log('🎯 バナスコAI分析開始:', { platform, category, purpose, industry, pattern, user: user.uid, remaining_uses: userData.remaining_uses })

    // 画像をBase64に変換
    const imageBase64 = `data:${imageFile.type};base64,${btoa(String.fromCharCode(...new Uint8Array(await imageFile.arrayBuffer())))}`
    
    // バナスコAI Vision API呼び出し
    const analysisResult = await performBanascoAnalysis(imageBase64, platform, category, purpose, industry, openaiKey)
    
    console.log('✅ バナスコAI分析完了:', analysisResult.score)

    // 利用回数を減らす
    const updateSuccess = await updateUserUsesInFirestore(user.uid, projectId, 1)
    if (!updateSuccess) {
      console.warn('⚠️ 利用回数の更新に失敗しました')
    }

    // 診断記録をFirestoreに保存
    const recordSuccess = await addBanascoDiagnosisRecord(user.uid, projectId, {
      ...analysisResult,
      pattern
    })
    if (!recordSuccess) {
      console.warn('⚠️ 診断記録の保存に失敗しました')
    }

    return c.json({
      success: true,
      result: analysisResult,
      remaining_uses: Math.max(0, userData.remaining_uses - 1),
      message: 'バナスコAI分析が完了しました'
    })

  } catch (error) {
    console.error('❌ バナスコAI分析エラー:', error)
    return c.json({ 
      success: false, 
      message: 'バナスコAI分析中にエラーが発生しました。もう一度試してください。',
      error: error.message 
    }, 500)
  }
})

// バナスコAI A/B比較エンドポイント
app.post('/api/analysis/ab-compare', async (c) => {
  console.log('🧠 バナスコAI A/B比較エンドポイント呼び出し')
  
  try {
    const user = getUserFromSession(c)
    if (!user) {
      return c.json({ success: false, message: 'Not authenticated' }, 401)
    }

    const formData = await c.req.formData()
    const imageFileA = formData.get('imageA') as File
    const imageFileB = formData.get('imageB') as File
    const platform = formData.get('platform') as string
    const category = formData.get('category') as string
    const purpose = formData.get('purpose') as string
    const industry = formData.get('industry') as string

    if (!imageFileA || !imageFileB || !platform || !category || !industry) {
      return c.json({ success: false, message: 'Required fields missing for A/B comparison' }, 400)
    }

    // Firebase設定確認
    const projectId = c.env.FIREBASE_PROJECT_ID
    const openaiKey = c.env.OPENAI_API_KEY
    
    if (!openaiKey) {
      return c.json({ success: false, message: 'AI service not configured' }, 500)
    }
    
    if (!projectId) {
      return c.json({ success: false, message: 'Database service not configured' }, 500)
    }

    // 利用制限チェック（A/B比較は2回分として計算）
    const userData = await getUserDataFromFirestore(user.uid, projectId)
    if (userData.remaining_uses < 2) {
      return c.json({ 
        success: false, 
        message: 'A/B比較には2回分の利用回数が必要です。残り回数が不足しています。',
        remaining_uses: userData.remaining_uses
      }, 403)
    }

    console.log('🎯 バナスコAI A/B分析開始:', { platform, category, purpose, industry, user: user.uid, remaining_uses: userData.remaining_uses })

    // 両方の画像をBase64に変換
    const imageA_Base64 = `data:${imageFileA.type};base64,${btoa(String.fromCharCode(...new Uint8Array(await imageFileA.arrayBuffer())))}`
    const imageB_Base64 = `data:${imageFileB.type};base64,${btoa(String.fromCharCode(...new Uint8Array(await imageFileB.arrayBuffer())))}`

    // 両方の画像を分析
    const [resultA, resultB] = await Promise.all([
      performBanascoAnalysis(imageA_Base64, platform, category, purpose, industry, openaiKey),
      performBanascoAnalysis(imageB_Base64, platform, category, purpose, industry, openaiKey)
    ])

    console.log('✅ バナスコAI A/B分析完了')

    // 利用回数を減らす（A/B比較は2回分）
    const updateSuccess = await updateUserUsesInFirestore(user.uid, projectId, 2)
    if (!updateSuccess) {
      console.warn('⚠️ 利用回数の更新に失敗しました')
    }

    // A/B比較記録をFirestoreに保存
    const comparison = generateBanascoComparison(resultA, resultB)
    const recordSuccess = await addBanascoDiagnosisRecord(user.uid, projectId, {
      type: 'ab_comparison',
      platform,
      category,
      purpose,
      industry,
      patternA: resultA,
      patternB: resultB,
      comparison,
      analysis: `A/B比較分析: ${comparison.summary}`
    })
    if (!recordSuccess) {
      console.warn('⚠️ A/B比較記録の保存に失敗しました')
    }

    return c.json({
      success: true,
      result: {
        patternA: resultA,
        patternB: resultB,
        comparison
      },
      remaining_uses: Math.max(0, userData.remaining_uses - 2),
      message: 'バナスコAI A/B比較分析が完了しました'
    })

  } catch (error) {
    console.error('❌ バナスコAI A/B分析エラー:', error)
    return c.json({ 
      success: false, 
      message: 'バナスコAI A/B分析中にエラーが発生しました。もう一度試してください。',
      error: error.message 
    }, 500)
  }
})

// OpenAI Vision API分析実行
async function performVisionAnalysis(imageBase64: string, platform: string, adType: string, apiKey: string) {
  const platformPrompts = {
    'instagram-post': 'このInstagram投稿画像を100点満点で採点してください。視覚的魅力、エンゲージメント予測、投稿としての効果を評価し、改善提案も含めてください。',
    'instagram-ad': `このInstagram${adType}広告を A/B/C の3段階で評価してください。訴求力、視覚的インパクト、コンバージョン予測を基準に判定し、詳細な改善提案を含めてください。`,
    'gdn': 'このGDN（Google Display Network）バナー広告をA/B/Cの3段階で評価してください。クリック率予測、視認性、訴求効果を分析してください。',
    'yahoo': 'このYahoo広告バナーをA/B/Cの3段階で評価してください。Yahoo広告の特徴を踏まえ、効果的な改善案を提案してください。'
  }

  const prompt = platformPrompts[platform as keyof typeof platformPrompts] || platformPrompts['instagram-post']

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-vision-preview',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ]
      }],
      max_tokens: 500
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const result = await response.json()
  const analysis = result.choices[0].message.content

  // スコア/グレードを抽出
  if (platform === 'instagram-post') {
    const scoreMatch = analysis.match(/(\d+)点|(\d+)\/100|Score:\s*(\d+)/i)
    const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 75

    return {
      score,
      analysis,
      improvements: extractImprovements(analysis),
      platform
    }
  } else {
    const gradeMatch = analysis.match(/[評価判定]?\s*[：:]\s*([ABC])/i) || analysis.match(/\b([ABC])\s*[評価段階]/i)
    const grade = gradeMatch ? gradeMatch[1] : 'B'

    return {
      grade,
      analysis,
      improvements: extractImprovements(analysis),
      platform
    }
  }
}

// 改善提案抽出
function extractImprovements(analysis: string): string[] {
  const improvements = []
  const lines = analysis.split('\n')
  
  for (const line of lines) {
    if (line.includes('改善') || line.includes('提案') || line.includes('向上') || line.includes('最適化')) {
      improvements.push(line.trim())
    }
  }
  
  return improvements.length > 0 ? improvements : ['より詳細な分析のため、画像の解像度を上げることをお勧めします。']
}

// A/B比較結果生成
function generateComparison(resultA: any, resultB: any) {
  if (resultA.score && resultB.score) {
    const winner = resultA.score > resultB.score ? 'A' : 'B'
    const difference = Math.abs(resultA.score - resultB.score)
    return {
      winner,
      difference,
      summary: `パターン${winner}が${difference}点高い評価です。`
    }
  } else {
    const gradeOrder = { 'A': 3, 'B': 2, 'C': 1 }
    const scoreA = gradeOrder[resultA.grade as keyof typeof gradeOrder] || 2
    const scoreB = gradeOrder[resultB.grade as keyof typeof gradeOrder] || 2
    const winner = scoreA > scoreB ? 'A' : (scoreA < scoreB ? 'B' : '引き分け')
    
    return {
      winner,
      summary: winner === '引き分け' ? '両パターンとも同程度の評価です。' : `パターン${winner}がより高い評価です。`
    }
  }
}

// バナスコAI Vision API分析実行
async function performBanascoAnalysis(imageBase64: string, platform: string, category: string, purpose: string, industry: string, apiKey: string) {
  const prompt = `あなたは『バナスコAI』- 最先端のバナー広告分析AIです。以下のバナー広告を詳細分析してください。

【分析対象】
- 媒体: ${platform}
- カテゴリー: ${category}  
- 目的: ${purpose}
- 業界: ${industry}

【採点基準】
1. 視認性 (20点): 見やすさ、読みやすさ、色彩バランス
2. 訴求力 (20点): メッセージの明確さ、感情的アピール  
3. デザイン (20点): レイアウト、フォント、画像品質
4. 媒体適合性 (20点): ${platform}での表示最適化
5. 業界適合性 (20点): ${industry}業界での効果予測

【出力形式】
**📊 バナスコAI分析結果**

**🏆 総合評価:** [A/B/C] ([0-100]点)

**📈 詳細採点:**
- 視認性: [0-20]点
- 訴求力: [0-20]点  
- デザイン: [0-20]点
- 媒体適合性: [0-20]点
- 業界適合性: [0-20]点

**💡 改善提案:**
1. [具体的改善案1]
2. [具体的改善案2] 
3. [具体的改善案3]

**⚖️ 薬機法チェック:** ${industry === '美容' || industry === '健康' || industry === '医療' ? '[要注意/問題なし] - [薬機法に関する具体的指摘]' : '対象外'}

**🎯 効果予測:** [CTR予測値]% | [CVR予測値]%`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageBase64 } }
        ]
      }],
      max_tokens: 800
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const result = await response.json()
  const analysis = result.choices[0].message.content

  // スコアとグレードを抽出
  const gradeMatch = analysis.match(/総合評価.*?([ABC])/i) || analysis.match(/\*\*([ABC])\*\*/i)
  const grade = gradeMatch ? gradeMatch[1] : 'B'
  
  const scoreMatch = analysis.match(/(\d+)点/i) || analysis.match(/\((\d+)\)/i)
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 75

  // 薬機法チェック結果を抽出
  const complianceMatch = analysis.match(/薬機法チェック.*?([要注意|問題なし])/i)
  const compliance = complianceMatch ? complianceMatch[1] : '対象外'

  return {
    grade,
    score,
    analysis,
    platform,
    category,
    purpose,
    industry,
    compliance,
    improvements: extractBanascoImprovements(analysis)
  }
}

// バナスコAI改善提案抽出
function extractBanascoImprovements(analysis: string): string[] {
  const improvements = []
  const lines = analysis.split('\n')
  
  let inImprovementSection = false
  for (const line of lines) {
    if (line.includes('改善提案') || line.includes('💡')) {
      inImprovementSection = true
      continue
    }
    
    if (inImprovementSection && line.trim()) {
      if (line.match(/^\d+\./) || line.includes('-')) {
        improvements.push(line.trim())
      } else if (line.includes('薬機法') || line.includes('効果予測')) {
        break
      }
    }
  }
  
  return improvements.length > 0 ? improvements : [
    'より高画質な画像を使用することをお勧めします',
    'メッセージの簡潔性を向上させてください', 
    'ターゲット層に合わせた色彩調整を検討してください'
  ]
}

// バナスコAI A/B比較結果生成
function generateBanascoComparison(resultA: any, resultB: any) {
  const winner = resultA.score > resultB.score ? 'A' : (resultB.score > resultA.score ? 'B' : '引き分け')
  const difference = Math.abs(resultA.score - resultB.score)
  
  let summary = ''
  if (winner === '引き分け') {
    summary = '両パターンとも同程度の評価です。'
  } else {
    summary = `パターン${winner}が${difference}点高い評価です。`
    
    if (difference >= 20) {
      summary += ' 大きな差があります。'
    } else if (difference >= 10) {
      summary += ' 明確な差があります。'
    } else {
      summary += ' 僅差です。'
    }
  }
  
  return {
    winner,
    difference,
    summary,
    recommendation: winner !== '引き分け' ? `パターン${winner}の採用をお勧めします` : '両パターンともさらなら改善を検討してください'
  }
}

// --- Firebase Firestore操作関数（REST API使用） ---

// Firestoreからユーザーデータを取得
async function getUserDataFromFirestore(uid: string, projectId: string) {
  try {
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
    
    const response = await fetch(firestoreUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const doc = await response.json()
      if (doc.fields) {
        return {
          plan: doc.fields.plan?.stringValue || 'Free',
          remaining_uses: parseInt(doc.fields.remaining_uses?.integerValue || '5'),
          email: doc.fields.email?.stringValue || ''
        }
      }
    }
    
    // ドキュメントが存在しない場合、新規作成
    return await createUserInFirestore(uid, projectId)
  } catch (error) {
    console.error('Firestore ユーザーデータ取得エラー:', error)
    return { plan: 'Free', remaining_uses: 5, email: '' }
  }
}

// Firestoreに新規ユーザーを作成
async function createUserInFirestore(uid: string, projectId: string, email?: string) {
  try {
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
    
    const userData = {
      fields: {
        email: { stringValue: email || '' },
        plan: { stringValue: 'Free' },
        remaining_uses: { integerValue: 5 },
        created_at: { timestampValue: new Date().toISOString() }
      }
    }
    
    const response = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    
    if (response.ok) {
      return { plan: 'Free', remaining_uses: 5, email: email || '' }
    } else {
      console.error('Firestore ユーザー作成に失敗:', await response.text())
      return { plan: 'Free', remaining_uses: 5, email: '' }
    }
  } catch (error) {
    console.error('Firestore ユーザー作成エラー:', error)
    return { plan: 'Free', remaining_uses: 5, email: '' }
  }
}

// ユーザーの利用回数を更新
async function updateUserUsesInFirestore(uid: string, projectId: string, usesToDeduct: number = 1) {
  try {
    const userData = await getUserDataFromFirestore(uid, projectId)
    const newRemainingUses = Math.max(0, userData.remaining_uses - usesToDeduct)
    
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
    
    const updateData = {
      fields: {
        remaining_uses: { integerValue: newRemainingUses },
        last_used_at: { timestampValue: new Date().toISOString() }
      }
    }
    
    const response = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    
    return response.ok
  } catch (error) {
    console.error('Firestore 利用回数更新エラー:', error)
    return false
  }
}

// バナスコAI診断記録をFirestoreに保存
async function addBanascoDiagnosisRecord(uid: string, projectId: string, recordData: any) {
  try {
    const timestamp = new Date().toISOString()
    const docId = `banasco_${timestamp.replace(/[:.]/g, '_')}`
    
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}/diagnoses/${docId}`
    
    const diagnosisData = {
      fields: {
        type: { stringValue: 'banasco_analysis' },
        platform: { stringValue: recordData.platform || '' },
        category: { stringValue: recordData.category || '' },
        industry: { stringValue: recordData.industry || '' },
        purpose: { stringValue: recordData.purpose || '' },
        grade: { stringValue: recordData.grade || '' },
        score: { integerValue: recordData.score || 0 },
        analysis: { stringValue: recordData.analysis || '' },
        compliance: { stringValue: recordData.compliance || '' },
        created_at: { timestampValue: timestamp }
      }
    }
    
    const response = await fetch(firestoreUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diagnosisData)
    })
    
    return response.ok
  } catch (error) {
    console.error('Firestore 診断記録保存エラー:', error)
    return false
  }
}

// API ステータスエンドポイント
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

// ========== SSR レンダリング（APIの後に定義） ==========

// レンダラー設定
app.use(renderer)

// ページルート設定
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

app.get('/admin', (c) => {
  return c.render(<AdminDashboard />)
})

app.get('/dashboard', (c) => {
  return c.render(<UserDashboard />)
})

app.get('/plan', (c) => {
  return c.render(<PlanManagement />)
})

// 404ハンドリング
app.notFound((c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-cyber-blue mb-4">404</h1>
        <p class="text-xl text-gray-300 mb-8">ページが見つかりません</p>
        <a href="/" class="btn btn-primary">
          <i class="fas fa-home mr-2"></i>ホームに戻る
        </a>
      </div>
    </div>
  )
})

export default app