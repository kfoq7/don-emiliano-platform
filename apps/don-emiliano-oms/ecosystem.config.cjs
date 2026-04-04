process.loadEnvFile()

module.exports = {
  apps: [
    {
      name: 'don-emiliano-oms',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: process.env.PRODUCTION_PORT,
        PM2_SERVE_SPA: 'true',
        LOCAL_IP_ADDRESS: process.env.LOCAL_IP_ADDRESS,
      },
    },
    {
      name: 'don-emiliano-oms-api',
      cwd: './server',
      script: './dist/index.js',
      env: {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        PORT: process.env.PORT,
      },
      max_memory_restart: '200M',
    },
  ],
}
