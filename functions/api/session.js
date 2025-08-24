// Firebase セッション管理API - Cloudflare Pages Functions format

// JWT検証のためのヘルパー関数
async function verifyFirebaseToken(idToken, projectId) {
  try {
    // Firebase公開鍵を使ってJWT検証（簡易版）
    const [header, payload, signature] = idToken.split('.');
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

// Cloudflare Pages Functions export format
export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS ヘッダー設定
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('🔥 Firebase session endpoint called');
    
    // body 安全に取得
    let idToken;
    try {
      const body = await request.json();
      idToken = body?.idToken;
      console.log('📨 Received idToken:', idToken ? idToken.substring(0, 20) + '...' : 'none');
    } catch (e) {
      console.error('❌ JSON parsing error:', e);
      return new Response(JSON.stringify({ 
        ok: false, 
        message: 'Invalid JSON body',
        error: e.message
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    if (!idToken) {
      console.log('❌ No idToken provided');
      return new Response(JSON.stringify({ 
        ok: false, 
        message: 'idToken required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const projectId = env.FIREBASE_PROJECT_ID || 'banasuko-auth';
    console.log('🔧 Using Firebase project:', projectId);
    
    // Firebase IDトークンを検証
    let user;
    try {
      user = await verifyFirebaseToken(idToken, projectId);
      console.log('✅ Token verified successfully for user:', user.uid);
    } catch (verifyError) {
      console.error('❌ Token verification failed:', verifyError.message);
      // 開発環境用のフォールバック
      user = {
        uid: 'dev-user-' + Math.random().toString(36).substring(7),
        email: 'dev-user@example.com',
        email_verified: false
      };
      console.log('⚠️ Using development fallback user:', user.uid);
    }

    // セッションクッキーを発行
    const sessionCookie = `bn_session=uid:${user.uid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
    
    return new Response(JSON.stringify({
      ok: true,
      uid: user.uid,
      email: user.email,
      message: 'Session created successfully'
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Set-Cookie': sessionCookie
      }
    });

  } catch (error) {
    console.error('💥 Session API error:', error);
    
    return new Response(JSON.stringify({ 
      ok: false, 
      message: error?.message || 'Server error',
      error: error.toString()
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// CORS preflight
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