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

async function handleApi(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ヘルスチェック
  if (pathname === '/api/health') {
    return json({ 
      ok: true, 
      from: '_worker.js',
      hasOpenAIKey: !!env.OPENAI_API_KEY 
    });
  }

  // 認証系
  if (pathname === '/api/auth/login' && request.method === 'POST') {
    try {
      const body = await request.json();
      const { email, password } = body;
      
      // デモアカウント認証（後でFirebaseに置換）
      if (email === 'demo@banasuko.com' && password === 'demo123') {
        return json(
          { success: true, user: { email, plan: 'free' } },
          { 
            status: 200,
            headers: { 'Set-Cookie': makeAuthCookie('demo-token') }
          }
        );
      }
      
      return json({ success: false, error: '認証に失敗しました' }, { status: 401 });
    } catch (error) {
      return json({ success: false, error: 'リクエストの解析に失敗しました' }, { status: 400 });
    }
  }

  if (pathname === '/api/auth/logout' && request.method === 'POST') {
    return json(
      { success: true },
      { 
        status: 200,
        headers: { 'Set-Cookie': clearAuthCookie() }
      }
    );
  }

  if (pathname === '/api/auth/user' && request.method === 'GET') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token === 'demo-token') {
      return json({ 
        success: true, 
        user: { uid: 'demo-user-id', email: 'demo@banasuko.com', plan: 'free' } 
      });
    }
    
    return json({ success: false, error: '認証が必要です' }, { status: 401 });
  }

  // ユーザー管理
  if (pathname === '/api/user/profile' && request.method === 'GET') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token === 'demo-token') {
      return json({ 
        success: true, 
        user: { uid: 'demo-user-id', email: 'demo@banasuko.com', plan: 'free' } 
      });
    }
    
    return json({ success: false, error: '認証が必要です' }, { status: 401 });
  }

  if (pathname === '/api/usage/dashboard' && request.method === 'GET') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token === 'demo-token') {
      return json({ 
        success: true, 
        usage: { 
          current: 3, 
          limit: 10, 
          plan: 'free' 
        } 
      });
    }
    
    return json({ success: false, error: '認証が必要です' }, { status: 400 });
  }

  if (pathname === '/api/user/plan' && request.method === 'POST') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token !== 'demo-token') {
      return json({ success: false, error: '認証が必要です' }, { status: 401 });
    }
    
    try {
      const body = await request.json();
      const { plan } = body;
      
      if (plan === 'free') {
        return json({ success: true, message: 'プランを無料に変更しました' });
      }
      
      return json({ success: false, error: '無効なプランです' }, { status: 400 });
    } catch (error) {
      return json({ success: false, error: 'リクエストの解析に失敗しました' }, { status: 400 });
    }
  }

  // 課金系
  if (pathname === '/api/billing/checkout' && request.method === 'POST') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token !== 'demo-token') {
      return json({ success: false, error: '認証が必要です' }, { status: 401 });
    }
    
    return json({ success: true, url: 'https://checkout.stripe.com/test_session_url' });
  }

  // 画像分析機能
  if (pathname === '/api/analysis/single' && request.method === 'POST') {
    const token = readCookie(request, COOKIE_NAME);
    
    if (token !== 'demo-token') {
      return json({ success: false, error: '認証が必要です' }, { status: 401 });
    }
    
    try {
      const formData = await request.formData();
      const imageFile = formData.get('image');
      
      if (!imageFile) {
        return json({ success: false, error: '画像ファイルが提供されていません' }, { status: 400 });
      }
      
      // ファイルサイズチェック（5MB制限）
      if (imageFile.size > 5 * 1024 * 1024) {
        return json({ success: false, error: '画像ファイルが大きすぎます（5MB以下にしてください）' }, { status: 400 });
      }
      
      // ファイルタイプチェック
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return json({ success: false, error: 'サポートされていないファイル形式です（JPEG, PNG, WebPのみ）' }, { status: 400 });
      }
      
      // デモ用の画像分析結果（後でOpenAI Vision APIに置換）
      const analysisResult = {
        success: true,
        data: {
          analysis: {
            visual_elements: [
              "青い背景色",
              "白いテキスト",
              "中央配置されたロゴ",
              "シンプルなデザイン"
            ],
            copy_suggestions: [
              "「信頼性」を強調するコピー",
              "「シンプルさ」をアピールするメッセージ",
              "「専門性」を示す表現"
            ],
            improvement_tips: [
              "コントラストをより強くする",
              "行動喚起ボタンを追加する",
              "ブランドカラーを統一する"
            ],
            target_audience: "ビジネスパーソン、30-50代",
            effectiveness_score: 7.5
          },
          image_info: {
            filename: imageFile.name,
            size: imageFile.size,
            type: imageFile.type,
            dimensions: "800x600"
          }
        }
      };
      
      return json(analysisResult);
      
    } catch (error) {
      console.error('Image analysis error:', error);
      return json({ success: false, error: '画像分析中にエラーが発生しました' }, { status: 500 });
    }
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
    
    // API routes - handled by Worker
    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env);
    }
    
    // Static assets - served by Pages
    try {
      // 直接的なファイルパスで静的ファイルを探す
      let response = await env.ASSETS.fetch(request);
      
      // ファイルが見つかった場合はそのまま返す
      if (response.status === 200) {
        return response;
      }
      
      // ファイルが見つからない場合の処理
      const pathname = url.pathname;
      
      // 特定のルートの場合はindex.htmlを返す（SPAルーティング）
      if (pathname === '/login' || pathname === '/dashboard' || pathname === '/') {
        const indexRequest = new Request(new URL('/index.html', request.url));
        response = await env.ASSETS.fetch(indexRequest);
        
        if (response.status === 200) {
          return new Response(response.body, {
            ...response,
            headers: { ...response.headers, 'Content-Type': 'text/html' }
          });
        }
      }
      
      // それでも見つからない場合は404
      return new Response('Not Found', { status: 404 });
      
    } catch (error) {
      console.error('Error serving static assets:', error);
      
      // エラーの場合のフォールバック
      try {
        const indexRequest = new Request(new URL('/index.html', request.url));
        const response = await env.ASSETS.fetch(indexRequest);
        
        if (response.status === 200) {
          return new Response(response.body, {
            ...response,
            headers: { ...response.headers, 'Content-Type': 'text/html' }
          });
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
      }
      
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
