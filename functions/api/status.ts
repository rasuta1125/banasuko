// functions/api/status.ts
// 監視用エンドポイント
import { Hono } from 'hono';

type Env = { FIREBASE_PROJECT_ID: string };

const app = new Hono<{ Bindings: Env }>();

app.get(async (c) => {
  const projectId = c.env.FIREBASE_PROJECT_ID || 'banasuko-auth';
  
  return c.json({
    ok: true,
    status: 'Firebase Auth Functions Active',
    projectId: projectId,
    timestamp: new Date().toISOString()
  });
});

export const onRequest = app.fetch;