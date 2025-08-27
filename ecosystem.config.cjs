module.exports = {
  apps: [
    {
      name: 'banasco-ai-dev',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 5173
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '500M'
    },
    {
      name: 'banasco-ai-prod',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000 --compatibility-date=2024-09-23',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '500M'
    }
  ]
}