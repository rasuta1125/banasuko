// メインアプリケーション - SSRレンダリング専用
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

// Cloudflare Pages Bindings型定義
type Env = { 
  OPENAI_API_KEY: string
  PING: string
  FIREBASE_PROJECT_ID: string
}

import { renderer } from './renderer'
import { HomePage } from './components/HomePage'
import { LoginPage } from './components/LoginPage'
import { AnalysisPage } from './components/AnalysisPage'
import { CopyGenerationPage } from './components/CopyGenerationPage'
import { AdminDashboard } from './components/AdminDashboard'
import { UserDashboard } from './components/UserDashboard'
import { PlanManagement } from './components/PlanManagement'

const app = new Hono<{ Bindings: Env }>()

// 静的ファイル配信
app.use('/static/*', serveStatic({ root: './public' }))

// レンダラー設定
app.use(renderer)

// ページルート設定
app.get('/', (c) => {
  return c.render(<HomePage />)
})

app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

app.get('/analysis', (c) => {
  return c.render(<AnalysisPage />)
})

app.get('/copy-generation', (c) => {
  return c.render(<CopyGenerationPage />)
})

app.get('/admin', (c) => {
  return c.render(<AdminDashboard />)
})

app.get('/dashboard', (c) => {
  return c.render(<UserDashboard />)
})

app.get('/plan', (c) => {
  return c.render(<PlanManagement />)
})

// 404ハンドリング
app.notFound((c) => {
  return c.render(
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-cyber-blue mb-4">404</h1>
        <p class="text-xl text-gray-300 mb-8">ページが見つかりません</p>
        <a href="/" class="btn btn-primary">
          <i class="fas fa-home mr-2"></i>ホームに戻る
        </a>
      </div>
    </div>
  )
})

export default app