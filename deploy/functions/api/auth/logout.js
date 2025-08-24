// ログアウトAPI - Cloudflare Pages Functions

// POST - ログアウト処理
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Set-Cookie': 'bn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  };

  try {
    console.log('🚪 Logout endpoint called');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Logged out successfully'
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('💥 Logout error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Logout failed',
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