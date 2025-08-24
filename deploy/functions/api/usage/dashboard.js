// ダッシュボードデータAPI - Cloudflare Pages Functions

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

// GET - ダッシュボードデータ取得
export async function onRequestGet(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('📊 Dashboard data endpoint called');
    
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

    console.log('✅ Dashboard data for user:', user.uid);

    // ダッシュボードデータ（実際のFirestoreから取得する代わりにモックデータ）
    const dashboardData = {
      user: {
        uid: user.uid,
        email: `user-${user.uid.substring(0, 8)}@verified.com`,
        displayName: `User${user.uid.substring(0, 6)}`,
        plan: 'free',
        planName: 'フリープラン'
      },
      usage: {
        singleAnalysis: { used: 0, limit: 10 },
        abComparison: { used: 0, limit: 5 },
        copyGeneration: { used: 0, limit: 3 }
      },
      daysUntilReset: 30
    };

    return new Response(JSON.stringify({
      success: true,
      data: dashboardData
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Dashboard data error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Dashboard data fetch failed',
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