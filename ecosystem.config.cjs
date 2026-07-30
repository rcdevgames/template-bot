module.exports = {
  apps: [
    {
      name: "template-bot",
      script: "./index.js",
      cwd: __dirname,
      interpreter: "bun",
      env: {
        NODE_ENV: "production",
      },
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};

// Dev: pm2 start ecosystem.config.cjs --watch
// Prod: pm2 start ecosystem.config.cjs
// Persist: pm2 save && pm2 startup

// ponytail: PostgreSQL service intentionally omitted; use existing waw_bridge DB.
// Add a db service only when local isolated development is needed.

/*
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: template_bot
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: change-me
    networks: [waw_bridge]

networks:
  waw_bridge:
    external: true
*/
        