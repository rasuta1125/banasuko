// ユーザー登録API - Cloudflare Pages Functions
// Firebase Auth連携 + シンプル認証システム

// セッションクッキー生成
function createSessionCookie(uid) {
  return `bn_session=uid:${uid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`; // 24時間
}

// ユーザー登録処理
function registerUser(email, password, username, displayName) {
  // バリデーション
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { success: false, error: '有効なメールアドレスを入力してください' };
  }
  
  if (password.length < 6) {
    return { success: false, error: 'パスワードは6文字以上で入力してください' };
  }
  
  if (!username || username.length < 2) {
    return { success: false, error: 'ユーザー名は2文字以上で入力してください' };
  }
  
  // デモユーザーとの重複チェック
  if (email === 'demo@banasuko.com') {
    return { success: false, error: 'このメールアドレスは既に使用されています' };
  }
  
  // 簡易UID生成（実際のプロダクションではより強固な生成方法を使用）
  const uid = 'user_' + Buffer.from(email).toString('base64').slice(0, 12);
  
  return {
    success: true,
    user: {
      uid: uid,
      email: email,
      username: username,
      displayName: displayName || username,
      plan: 'free',
      authenticated: true,
      created: new Date().toISOString()
    }
  };
}

// POST - ユーザー登録処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    console.log('👤 Register endpoint called');
    
    const body = await request.json();
    const { email, password, username, displayName } = body;
    
    if (!email || !password || !username) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'メールアドレス、パスワード、ユーザー名は必須です' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      });
    }

    const registerResult = registerUser(email, password, username, displayName);
    
    if (!registerResult.success) {
      console.log('❌ Registration failed for:', email);
      return new Response(JSON.stringify({ 
        success: false, 
        error: registerResult.error 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      });
    }

    console.log('✅ Registration successful for:', email);

    return new Response(JSON.stringify({
      success: true,
      message: 'アカウントが作成されました',
      user: registerResult.user
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Set-Cookie': createSessionCookie(registerResult.user.uid)
      }
    });

  } catch (error) {
    console.error('💥 Registration error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'アカウント作成でエラーが発生しました',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
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
