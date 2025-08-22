import { Hono } from 'hono'

type Env = { 
  OPENAI_API_KEY: string
  PING: string 
}

const app = new Hono<{ Bindings: Env }>()

app.get('*', (c) => {
  const k = c.env.OPENAI_API_KEY
  const ping = c.env.PING
  const envKeysCount = Object.keys(c.env || {}).length

  return c.json({
    success: true,
    status: {
      openai_configured: Boolean(k),
      key_prefix: k ? k.slice(0, 3) + '...' : 'undefined...',
      ping_seen: ping === 'ok',
      env_keys_count: envKeysCount,
      environment: 'pages',
      cloudflare_context: true,
      timestamp: new Date().toISOString()
    }
  })
})

export const onRequest = app.fetch