// デモログインAPI - Cloudflare Pages Functions
// 簡単なデモ認証システム

// デモユーザーデータ
const DEMO_USER = {
  uid: 'demo_user_001',
  email: 'demo@banasuko.com',
  username: 'demo',
  displayName: 'デモユーザー',
  plan: 'premium',
  authenticated: true
};

// セッションクッキー生成
function createSessionCookie(uid) {
  return `bn_session=uid:${uid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`; // 24時間
}

// POST - デモログイン処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    console.log('🎭 Demo login endpoint called');

    // デモログインは常に成功
    const demoUser = { ...DEMO_USER };
    
    console.log('✅ Demo login successful');

    return new Response(JSON.stringify({
      success: true,
      message: 'デモログインに成功しました',
      user: demoUser
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Set-Cookie': createSessionCookie(demoUser.uid)
      }
    });

  } catch (error) {
    console.error('💥 Demo login error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'デモログイン処理でエラーが発生しました',
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
