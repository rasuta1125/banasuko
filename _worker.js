// _worker.js — Cloudflare Pages (Worker mode)
// /api/* をWorkerで処理し、それ以外は静的ASSETSへ。
// まずはスタブ（ダミー）実装。後から Firebase/Stripe に置換する。

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };
const COOKIE_NAME = 'auth-token';

const json = (obj, init = {}) =>
  new Response(JSON.stringify(obj), { headers: { ...JSON_HEADERS }, ...init });

function makeAuthCookie(value, { maxAgeSec = 60 * 60 * 24 * 7 } = {}) {
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSec}`;
}
function clearAuthCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
function readCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  return cookie.split(';').map(x => x.trim())
    .find(x => x.startsWith(`${name}=`))?.split('=')[1];
}
function requireAuth(request) {
  const token = readCookie(request, COOKIE_NAME);
  return token ? { uid: 'demo-user-id', email: 'demo@banasuko.com', plan: 'free' } : null;
}

async function handleApi(request, env) {
  const { pathname } = new URL(request.url);

  // 健康診断
  if (pathname === '/api/health' && request.method === 'GET') {
    return json({ ok: true, from: '_worker.js', hasOpenAIKey: Boolean(env.OPENAI_API_KEY) });
  }

  // 認証
  if (pathname === '/api/auth/login' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const email = body.email || 'demo@banasuko.com';
    const headers = new Headers(JSON_HEADERS);
    headers.append('Set-Cookie', makeAuthCookie('demo-token'));
    return new Response(JSON.stringify({ success: true, user: { email, plan: 'free' }}), { status: 200, headers });
  }
  if (pathname === '/api/auth/logout' && request.method === 'POST') {
    const headers = new Headers(JSON_HEADERS);
    headers.append('Set-Cookie', clearAuthCookie());
    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  }
  if (pathname === '/api/auth/user' && request.method === 'GET') {
    const user = requireAuth(request);
    if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
    return json({ success: true, user });
  }

  // プロフィール/使用量
  if (pathname === '/api/user/profile' && request.method === 'GET') {
    const user = requireAuth(request);
    if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
    return json({ success: true, plan: user.plan, user });
  }
  if (pathname === '/api/usage/dashboard' && request.method === 'GET') {
    const user = requireAuth(request);
    if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
    return json({
      success: true,
      data: {
        currentUsage: { single_analysis: 0, ab_comparison: 0, copy_generation: 0 },
        limits: { single_analysis: 10, ab_comparison: 10, copy_generation: 10 },
        usagePercentage: { single_analysis: 0, ab_comparison: 0, copy_generation: 0 },
        daysUntilReset: 30,
        recentActivity: []
      }
    });
  }

  // プラン変更
  if (pathname === '/api/user/plan' && request.method === 'POST') {
    const user = requireAuth(request);
    if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const plan = body.plan || 'free';
    // 後で Firestore を更新する実装に置換
    return json({ success: true, plan });
  }

  // 決済（Stripe Checkout）
  if (pathname === '/api/billing/checkout' && request.method === 'POST') {
    const user = requireAuth(request);
    if (!user) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const plan = body.plan;
    if (!plan || !['basic', 'premium'].includes(plan)) {
      return json({ success: false, error: 'invalid plan' }, { status: 400 });
    }
    // 後で本番の Stripe Checkout に置換
    return json({ success: true, url: 'https://checkout.stripe.com/test_session_url' });
  }

  // Webhook（署名検証は後で実装）
  if (pathname === '/api/stripe/webhook' && request.method === 'POST') {
    return new Response(null, { status: 204 });
  }

  return json({ success: false, error: 'Not Found' }, { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env);
    }
    return env.ASSETS.fetch(request);
  }
};
