// 単一画像分析API - Cloudflare Pages Functions

// Firebase/Firestore REST API設定
const FIREBASE_PROJECT_ID = 'banasuko-ai';
const FIRESTORE_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

// 分析結果をFirestoreに保存（REST API使用）
async function saveAnalysisResult(userId, analysisData) {
  try {
    const docData = {
      fields: {
        userId: { stringValue: userId },
        type: { stringValue: analysisData.type },
        platform: { stringValue: analysisData.platform },
        adType: { stringValue: analysisData.adType || '' },
        score: analysisData.result.score ? { integerValue: analysisData.result.score.toString() } : { nullValue: null },
        grade: analysisData.result.grade ? { stringValue: analysisData.result.grade } : { nullValue: null },
        analysis: { stringValue: analysisData.result.analysis || '' },
        improvements: {
          arrayValue: {
            values: (analysisData.result.improvements || []).map(imp => ({ stringValue: imp }))
          }
        },
        imageHash: { stringValue: analysisData.imageHash },
        timestamp: { timestampValue: new Date().toISOString() },
        isDemo: { booleanValue: analysisData.result.isDemo || false }
      }
    };

    const response = await fetch(`${FIRESTORE_ENDPOINT}/analysisResults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(docData)
    });

    if (!response.ok) {
      throw new Error(`Firestore API error: ${response.status}`);
    }

    const result = await response.json();
    return result.name.split('/').pop(); // ドキュメントID を返す
  } catch (error) {
    console.error('Firestore save error:', error);
    throw error;
  }
}

// 画像ハッシュ生成
function generateImageHash(imageBase64) {
  // Base64データから実際の画像データ部分を抽出
  const imageData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  
  // 簡易ハッシュ生成（暗号化ライブラリが使えない場合の代替）
  let hash = 0;
  for (let i = 0; i < imageData.length; i++) {
    const char = imageData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit整数に変換
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

// セッションからユーザー情報を取得
function getUserFromCookie(request) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  const sessionCookie = cookies.bn_session;
  if (sessionCookie && sessionCookie.startsWith('uid:')) {
    return {
      uid: sessionCookie.replace('uid:', ''),
      authenticated: true
    };
  }
  
  return null;
}

// OpenAI Vision API分析実行
async function performVisionAnalysis(imageBase64, platform, adType, apiKey) {
  const platformPrompts = {
    'instagram-post': 'このInstagram投稿画像を100点満点で採点してください。視覚的魅力、エンゲージメント予測、投稿としての効果を評価し、改善提案も含めてください。',
    'instagram-ad': `このInstagram${adType}広告を A/B/C の3段階で評価してください。訴求力、視覚的インパクト、コンバージョン予測を基準に判定し、詳細な改善提案を含めてください。`,
    'gdn': 'このGDN（Google Display Network）バナー広告をA/B/Cの3段階で評価してください。クリック率予測、視認性、訴求効果を分析してください。',
    'yahoo': 'このYahoo広告バナーをA/B/Cの3段階で評価してください。Yahoo広告の特徴を踏まえ、効果的な改善案を提案してください。'
  };

  const prompt = platformPrompts[platform] || platformPrompts['instagram-post'];

  try {
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
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const analysis = result.choices[0].message.content;

    // スコア/グレードを抽出
    if (platform === 'instagram-post') {
      const scoreMatch = analysis.match(/(\d+)点|(\d+)\/100|Score:\s*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]) : 75;

      return {
        score,
        analysis,
        improvements: extractImprovements(analysis),
        platform
      };
    } else {
      const gradeMatch = analysis.match(/[評価判定]?\s*[：:]\s*([ABC])/i) || analysis.match(/\b([ABC])\s*[評価段階]/i);
      const grade = gradeMatch ? gradeMatch[1] : 'B';

      return {
        grade,
        analysis,
        improvements: extractImprovements(analysis),
        platform
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    // デモデータで代替
    return {
      score: platform === 'instagram-post' ? 78 : undefined,
      grade: platform !== 'instagram-post' ? 'B' : undefined,
      analysis: 'AI分析サービスが一時的に利用できません。画像の視覚的魅力は良好で、改善の余地があります。',
      improvements: ['画像の解像度を向上させる', 'コントラストを調整する', 'テキストの可読性を高める'],
      platform,
      isDemo: true
    };
  }
}

// 改善提案抽出
function extractImprovements(analysis) {
  const improvements = [];
  const lines = analysis.split('\n');
  
  for (const line of lines) {
    if (line.includes('改善') || line.includes('提案') || line.includes('向上') || line.includes('最適化')) {
      improvements.push(line.trim());
    }
  }
  
  return improvements.length > 0 ? improvements : ['より詳細な分析のため、画像の解像度を上げることをお勧めします。'];
}

// POST - 単一画像分析
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('🔍 Single image analysis endpoint called');
    
    const user = getUserFromCookie(request);
    if (!user) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Not authenticated' 
      }), {
        status: 401,
        headers: corsHeaders
      });
    }

    const body = await request.json();
    const { image, platform, adType } = body;

    if (!image || !platform) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Image and platform are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    console.log('🎯 Analysis started:', { platform, adType, user: user.uid });

    // OpenAI API Key確認
    const openaiKey = env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.warn('⚠️ OpenAI API Key not configured, using demo data');
    }

    // OpenAI Vision API呼び出し
    const analysisResult = await performVisionAnalysis(image, platform, adType, openaiKey);
    
    console.log('✅ Analysis completed:', analysisResult.score || analysisResult.grade);

    // Firestore にデータを保存
    try {
      await saveAnalysisResult(user.uid, {
        type: 'single_analysis',
        platform,
        adType,
        result: analysisResult,
        timestamp: new Date(),
        imageHash: generateImageHash(image)
      });
      console.log('💾 Analysis result saved to Firestore');
    } catch (firestoreError) {
      console.warn('⚠️ Failed to save to Firestore:', firestoreError.message);
      // Continue without failing the request
    }

    return new Response(JSON.stringify({
      success: true,
      result: analysisResult,
      message: '分析が完了しました'
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Analysis error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: '分析中にエラーが発生しました。もう一度試してください。',
      error: error.message 
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// OPTIONS - CORS preflight
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}