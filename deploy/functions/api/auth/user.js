// ユーザー認証状態確認API - Cloudflare Pages Functions

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

// GET - ユーザー認証状態確認
export async function onRequestGet(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('🔍 User authentication check called');
    
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

    console.log('✅ User authenticated:', user.uid);

    // ユーザー情報を返す（UIDベースで判定）
    let userInfo;
    
    if (user.uid === 'demo_user_001') {
      // デモユーザーの場合
      userInfo = {
        uid: user.uid,
        email: 'demo@banasuko.com',
        username: 'demo',
        displayName: 'デモユーザー',
        plan: 'premium',
        authenticated: true
      };
    } else {
      // 一般ユーザーの場合（UIDから情報を復元）
      let email, username;
      
      if (user.uid.startsWith('user_')) {
        // Base64でエンコードされたメールアドレスから復元を試行
        try {
          const base64Part = user.uid.replace('user_', '');
          // 実際のメールアドレスは保存されていないため、簡易的な表示用メールアドレスを生成
          email = `user-${user.uid.substring(5, 13)}@example.com`;
          username = `user${user.uid.substring(5, 11)}`;
        } catch (e) {
          email = `user-${user.uid.substring(0, 8)}@example.com`;
          username = `user${user.uid.substring(0, 6)}`;
        }
      } else {
        email = `user-${user.uid.substring(0, 8)}@example.com`;
        username = `user${user.uid.substring(0, 6)}`;
      }
      
      userInfo = {
        uid: user.uid,
        email: email,
        username: username,
        displayName: username,
        plan: 'free',
        authenticated: true
      };
    }

    return new Response(JSON.stringify({
      success: true,
      user: userInfo
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Authentication check error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Authentication check failed',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }
  });
}