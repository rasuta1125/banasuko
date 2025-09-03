// functions/api/user.ts
// ユーザー管理エンドポイント
import { Hono } from 'hono';
import { jwtVerify, createRemoteJWKSet } from 'jose';

type Env = { FIREBASE_PROJECT_ID: string };

const app = new Hono<{ Bindings: Env }>();

// Google Secure Token のJWK
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);

// JWT認証ミドルウェア
async function authenticateJWT(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Authorization header required', status: 401 };
  }

  const idToken = authHeader.substring(7);
  const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';

  try {
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    return {
      uid: payload.user_id as string,
      email: payload.email as string,
    };
  } catch (e: any) {
    console.error('JWT verification error:', e);
    return { error: 'Invalid token', status: 401 };
  }
}

// ユーザープロフィール作成/更新
app.post('/profile', async (c) => {
  const auth = await authenticateJWT(c);
  if ('error' in auth) {
    return c.json({ ok: false, message: auth.error }, auth.status);
  }

  try {
    const body = await c.req.json();
    
    // ユーザープロフィールデータ構造
    const userProfile = {
      uid: auth.uid,
      email: auth.email,
      displayName: body.displayName || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      plan: 'free', // デフォルトプラン
      analysisCount: 0,
      monthlyAnalysisCount: 0,
      lastLoginAt: new Date().toISOString(),
    };

    // Note: Cloudflare Workers環境では直接Firestoreを使用できないため、
    // 代替案として外部APIまたはKVストレージを使用する必要があります
    
    console.log('User profile to save:', userProfile);
    
    return c.json({
      ok: true, 
      message: 'Profile saved successfully',
      user: userProfile
    });

  } catch (error: any) {
    console.error('Profile creation error:', error);
    return c.json({ ok: false, message: 'Failed to create profile' }, 500);
  }
});

// ユーザープロフィール取得
app.get('/profile', async (c) => {
  const auth = await authenticateJWT(c);
  if ('error' in auth) {
    return c.json({ ok: false, message: auth.error }, auth.status);
  }

  try {
    // Note: 実際の実装では、ここでFirestoreまたはKVストレージからデータを取得
    const userProfile = {
      uid: auth.uid,
      email: auth.email,
      displayName: null,
      plan: 'free',
      analysisCount: 0,
      monthlyAnalysisCount: 0,
    };

    return c.json({
      ok: true,
      user: userProfile
    });

  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return c.json({ ok: false, message: 'Failed to fetch profile' }, 500);
  }
});

export const onRequest = app.fetch;