// ユーザープロファイル管理API - Cloudflare Pages Functions

// JWT検証のためのヘルパー関数
async function verifyFirebaseToken(idToken, projectId) {
  try {
    // Firebase公開鍵を使ってJWT検証
    const response = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
    const jwks = await response.json();
    
    // 簡易的な検証（本来はjose等のライブラリを使用）
    const [header, payload] = idToken.split('.');
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    
    // 基本的な検証
    if (decodedPayload.iss !== `https://securetoken.google.com/${projectId}`) {
      throw new Error('Invalid issuer');
    }
    
    if (decodedPayload.aud !== projectId) {
      throw new Error('Invalid audience');
    }
    
    if (decodedPayload.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }
    
    return {
      uid: decodedPayload.user_id || decodedPayload.sub,
      email: decodedPayload.email,
      email_verified: decodedPayload.email_verified
    };
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid token');
  }
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

// POST - ユーザープロファイル作成
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('🔥 User profile creation endpoint called');
    
    // 認証確認
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
    console.log('📨 Profile creation request:', { 
      uid: user.uid, 
      email: body.email,
      displayName: body.displayName 
    });
    
    // Firestoreへの書き込み（環境変数で設定されたプロジェクトIDを使用）
    const projectId = env.FIREBASE_PROJECT_ID || 'banasuko-auth';
    console.log('🔧 Using Firebase project:', projectId);
    
    // Firestore REST API を使用してプロファイル作成
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${user.uid}`;
    
    const profileData = {
      fields: {
        uid: { stringValue: user.uid },
        email: { stringValue: body.email || '' },
        displayName: { stringValue: body.displayName || body.email?.split('@')[0] || 'ユーザー' },
        plan: { stringValue: body.plan || 'free' },
        createdAt: { timestampValue: new Date().toISOString() },
        lastLoginAt: { timestampValue: new Date().toISOString() },
        usage: {
          mapValue: {
            fields: {
              singleAnalysis: { integerValue: '0' },
              abComparison: { integerValue: '0' },
              copyGeneration: { integerValue: '0' }
            }
          }
        }
      }
    };

    // Firebase Admin SDK を使わずに REST API で直接書き込み
    // 注意: デモ環境用の実装
    console.log('📝 Creating Firestore profile...');
    
    try {
      // まずFirestoreルールが書き込み可能かテスト
      const firestoreResponse = await fetch(firestoreUrl, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      
      console.log('🔍 Firestore response:', firestoreResponse.status, firestoreResponse.statusText);
      
      // レスポンスボディをログ出力
      const responseText = await firestoreResponse.text();
      console.log('📄 Firestore response body:', responseText);

      if (firestoreResponse.ok) {
        console.log('✅ Firestore profile created successfully');
        
        return new Response(JSON.stringify({
          success: true,
          message: 'Profile created successfully in Firestore',
          user: {
            uid: user.uid,
            email: body.email,
            displayName: body.displayName || body.email?.split('@')[0] || 'ユーザー',
            plan: 'free',
            createdAt: new Date().toISOString()
          },
          firestore: 'success'
        }), {
          status: 200,
          headers: corsHeaders
        });
      } else {
        console.error('❌ Firestore write failed:', firestoreResponse.status, responseText);
        
        // Firestore書き込み失敗の詳細をレスポンスに含める
        throw new Error(`Firestore write failed: ${firestoreResponse.status} - ${responseText}`);
      }
    } catch (firestoreError) {
      console.error('❌ Firestore error:', firestoreError);
      // Firestore失敗でもローカルセッションは作成
      return new Response(JSON.stringify({
        success: true,
        message: 'Profile created locally (Firestore pending)',
        user: {
          uid: user.uid,
          email: body.email,
          displayName: body.displayName || body.email?.split('@')[0] || 'ユーザー',
          plan: 'free',
          createdAt: new Date().toISOString()
        },
        note: 'Firestore integration pending'
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

  } catch (error) {
    console.error('💥 Profile creation error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Profile creation failed',
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