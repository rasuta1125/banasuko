import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      generateRoutes: true,
      outputDir: 'dist'
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'src/index.tsx'
      }
    }
  }
})
