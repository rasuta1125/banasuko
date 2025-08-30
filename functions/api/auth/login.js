// ログインAPI - Cloudflare Pages Functions

// セッション管理
function setUserSession(response, userData) {
  const sessionValue = `uid:${userData.uid}`;
  response.headers.set('Set-Cookie', `bn_session=${sessionValue}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`);
}

// デモユーザー情報
const DEMO_USER = {
  uid: 'demo-user-12345',
  email: 'demo@banasuko.com',
  username: 'demo',
  displayName: 'デモユーザー',
  plan: 'free'
};

// POST - ログイン処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('🔐 Login request received');
    
    const body = await request.json();
    const { email, password, username } = body;
    
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email and password are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    // デモログインの処理
    if (email === 'demo@banasuko.com' && password === 'demo123') {
      console.log('✅ Demo login successful');
      
      const response = new Response(JSON.stringify({
        success: true,
        user: DEMO_USER
      }), {
        status: 200,
        headers: corsHeaders
      });
      
      setUserSession(response, DEMO_USER);
      return response;
    }
    
    // 実際の認証処理（Firebase Authenticationを使用）
    // ここでは簡易的な認証として、メールアドレスベースの認証を実装
    const userData = {
      uid: `user-${Date.now()}`,
      email: email,
      username: username || email.split('@')[0],
      displayName: username || email.split('@')[0],
      plan: 'free'
    };
    
    console.log('✅ Login successful:', userData.email);
    
    const response = new Response(JSON.stringify({
      success: true,
      user: userData
    }), {
      status: 200,
      headers: corsHeaders
    });
    
    setUserSession(response, userData);
    return response;
    
  } catch (error) {
    console.error('💥 Login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Login failed',
      debug: {
        timestamp: new Date().toISOString(),
        errorType: error.constructor.name
      }
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
