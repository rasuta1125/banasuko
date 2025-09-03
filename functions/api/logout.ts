// functions/api/logout.ts
// セッション破棄用エンドポイント
import { Hono } from 'hono';

const app = new Hono();

app.post(async (c) => {
  // セッションクッキーを削除
  c.header('Set-Cookie', 'bn_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  
  return c.json({
    ok: true,
    message: 'Session destroyed'
  });
});

export const onRequest = app.fetch;