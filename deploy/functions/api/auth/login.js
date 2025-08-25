// ログインAPI - Cloudflare Pages Functions
// Firebase Auth連携 + シンプル認証システム

// 簡易ユーザーデータベース（本番環境ではFirestore等を使用）
const DEMO_USERS = {
  'demo@banasuko.com': {
    uid: 'demo_user_001',
    email: 'demo@banasuko.com',
    username: 'demo',
    displayName: 'デモユーザー',
    password: 'demo123', // 実際のプロダクションではハッシュ化必須
    plan: 'premium',
    created: '2024-01-01'
  }
};

// セッションクッキー生成
function createSessionCookie(uid) {
  return `bn_session=uid:${uid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`; // 24時間
}

// ユーザー認証処理
function authenticateUser(email, password) {
  // デモユーザーチェック
  if (DEMO_USERS[email] && DEMO_USERS[email].password === password) {
    return {
      success: true,
      user: {
        uid: DEMO_USERS[email].uid,
        email: DEMO_USERS[email].email,
        username: DEMO_USERS[email].username,
        displayName: DEMO_USERS[email].displayName,
        plan: DEMO_USERS[email].plan,
        authenticated: true
      }
    };
  }
  
  // 一般ユーザー用簡易認証（メールアドレス形式チェック）
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email) && password.length >= 6) {
    // 簡易UID生成（実際のプロダクションではより強固な生成方法を使用）
    const uid = 'user_' + Buffer.from(email).toString('base64').slice(0, 12);
    
    return {
      success: true,
      user: {
        uid: uid,
        email: email,
        username: email.split('@')[0],
        displayName: email.split('@')[0],
        plan: 'free',
        authenticated: true
      }
    };
  }
  
  return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' };
}

// POST - ログイン処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    console.log('🔐 Login endpoint called');
    
    const body = await request.json();
    const { email, password, username } = body;
    
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'メールアドレスとパスワードは必須です' 
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

    const authResult = authenticateUser(email, password);
    
    if (!authResult.success) {
      console.log('❌ Login failed for:', email);
      return new Response(JSON.stringify({ 
        success: false, 
        error: authResult.error 
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      });
    }

    console.log('✅ Login successful for:', email);

    return new Response(JSON.stringify({
      success: true,
      message: 'ログインに成功しました',
      user: authResult.user
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Set-Cookie': createSessionCookie(authResult.user.uid)
      }
    });

  } catch (error) {
    console.error('💥 Login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'ログイン処理でエラーが発生しました',
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
