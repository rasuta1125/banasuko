// Firebase セッション管理API
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwtVerify, createRemoteJWKSet } from 'jose'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('*', cors())

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

// セッション作成
app.post('/', async (c) => {
  // body 安全に取得
  let idToken: string | undefined;
  try {
    const body = await c.req.json();
    idToken = body?.idToken;
  } catch (_) {}
  if (!idToken) return c.json({ ok: false, message: 'idToken required' }, 400);

  const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';
  try {
    // ここが一致しないと 401 になります
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    // 必要ならセッションクッキーを発行（任意）
    c.header('Set-Cookie',
      `bn_session=uid:${payload.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );

    return c.json({
      ok: true,
      uid: payload.user_id,
      email: payload.email ?? null,
    });
  } catch (e: any) {
    console.error('Token verification error:', e);
    return c.json({ ok: false, message: e?.message || 'invalid token' }, 401);
  }
});

// CORS for session endpoint
app.options('/', (c) => {
  c.header('Access-Control-Allow-Origin', c.req.header('Origin') || '*');
  c.header('Access-Control-Allow-Headers', 'content-type');
  c.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return c.body(null, 204);
});

// セッション削除
app.delete('/', async (c) => {
  try {
    // クッキー削除
    const { deleteCookie } = await import('hono/cookie')
    deleteCookie(c, 'auth-token')
    
    return c.json({
      success: true,
      message: 'セッションが削除されました'
    })
  } catch (error) {
    console.error('Session deletion error:', error)
    return c.json({ 
      success: false, 
      error: 'セッション削除に失敗しました' 
    }, 500)
  }
})

export default app