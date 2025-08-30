// ユーザー登録API - Cloudflare Pages Functions

// セッション管理
function setUserSession(response, userData) {
  const sessionValue = `uid:${userData.uid}`;
  response.headers.set('Set-Cookie', `bn_session=${sessionValue}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`);
}

// POST - ユーザー登録処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('📝 Registration request received');
    
    const body = await request.json();
    const { email, password, username, displayName } = body;
    
    if (!email || !password || !username) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email, password, and username are required' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    if (password.length < 6) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Password must be at least 6 characters long' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }
    
    // ユーザーIDの生成
    const uid = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const userData = {
      uid: uid,
      email: email,
      username: username,
      displayName: displayName || username,
      plan: 'free'
    };
    
    // プロファイル作成APIを呼び出してFirestoreに保存
    try {
      const profileResponse = await fetch(`${c.req.url.replace('/register', '/user/profile')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid,
          email: email,
          displayName: displayName || username,
          plan: 'free'
        })
      });
      
      if (profileResponse.ok) {
        console.log('✅ User profile created in Firestore');
      } else {
        console.warn('⚠️ Failed to create user profile in Firestore');
      }
    } catch (profileError) {
      console.error('💥 Profile creation error:', profileError);
    }
    
    console.log('✅ Registration successful:', userData.email);
    
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
    console.error('💥 Registration error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Registration failed',
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
