// 初代バナスコの認証ロジックを移植
// バナスコAI - ログイン・登録機能

// Firebase REST API設定（初代バナスコと同じ）
const FIREBASE_AUTH_BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";

// 初代バナスコのsign_in_with_email_and_password関数を移植
async function signInWithEmailAndPassword(email, password, apiKey) {
  const url = `${FIREBASE_AUTH_BASE_URL}signInWithPassword?key=${apiKey}`;
  const data = { email, password, returnSecureToken: true };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// 初代バナスコのcreate_user_with_email_and_password関数を移植
async function createUserWithEmailAndPassword(email, password, apiKey) {
  const url = `${FIREBASE_AUTH_BASE_URL}signUp?key=${apiKey}`;
  const data = { email, password, returnSecureToken: true };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// セッション管理
function setUserSession(response, userData) {
  const sessionValue = userData.idToken || `uid:${userData.uid}`;
  response.headers.set('Set-Cookie', `bn_session=${sessionValue}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`);
}

// POST - ログイン処理（初代バナスコのロジックを移植）
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
    const { email, password } = body;
    
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'メールアドレスとパスワードを入力してください' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // 初代バナスコのFirebase APIキーを使用
    const firebaseApiKey = env.FIREBASE_WEB_API_KEY;
    
    if (!firebaseApiKey) {
      console.error('❌ Firebase API key not configured');
      return new Response(JSON.stringify({ 
        success: false, 
        error: '認証システムが設定されていません' 
      }), {
        status: 500,
        headers: corsHeaders
      });
    }

    // 初代バナスコの認証ロジックを使用
    const userInfo = await signInWithEmailAndPassword(email, password, firebaseApiKey);
    
    console.log('✅ Login successful:', userInfo.email);
    
    const userData = {
      uid: userInfo.localId,
      email: userInfo.email,
      idToken: userInfo.idToken,
      displayName: userInfo.email.split('@')[0],
      plan: 'free'
    };
    
    const response = new Response(JSON.stringify({
      success: true,
      user: userData,
      message: 'ログインに成功しました'
    }), {
      status: 200,
      headers: corsHeaders
    });
    
    setUserSession(response, userData);
    return response;
    
  } catch (error) {
    console.error('💥 Login error:', error);
    
    // 初代バナスコのエラーハンドリングを移植
    let errorMessage = 'ログインに失敗しました';
    let statusCode = 500;
    
    if (error.message.includes('EMAIL_NOT_FOUND')) {
      errorMessage = 'ユーザーが見つかりません';
      statusCode = 401;
    } else if (error.message.includes('INVALID_PASSWORD')) {
      errorMessage = 'パスワードが間違っています';
      statusCode = 401;
    } else if (error.message.includes('INVALID_EMAIL')) {
      errorMessage = 'メールアドレスの形式が正しくありません';
      statusCode = 400;
    } else if (error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
      errorMessage = 'ログイン試行回数が多すぎます。しばらく待ってから再試行してください';
      statusCode = 429;
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage
    }), {
      status: statusCode,
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
