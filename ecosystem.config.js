const config = {
  apps: [{
    name: 'banasuko-test',
    script: 'python3',
    args: 'test_server.py',
    cwd: '/home/user/webapp',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 8080
    }
  }]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
} else {
  export default config;
}
