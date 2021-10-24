module.exports = {
  apps: [{
    name: 'BotName',
    script: './src/index.js'
  }],
  watch_delay: 1000,
  restart_delay: 4000,
  ignore_watch: ['node_modules', 'logs'],
  watch: ['src'],
  watch_options: {
    followSymlinks: false
  },
  env_production: {
    NODE_ENV: 'production'
  },
  env_development: {
    NODE_ENV: 'development'
  },
  autorestart: true
}
