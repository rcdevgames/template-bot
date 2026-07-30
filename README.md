# Telegram Bot Template (grammY + JavaScript)

A lightweight, modern, and production-ready template for Telegram bots using [grammY](https://grammy.dev/) framework.

## Features

- **Modern JS (ESM)**: Clean, modular, and async/await-based.
- **grammY Framework**: Fast, easy to use, and well-documented.
- **Command Handling**: Simple structure for `/start`, `/help`, etc.
- **Middleware Ready**: Includes rate limiting, session management, and auth placeholders.
- **Production Ready**: PM2 and Docker configurations included.
- **Linting & Formatting**: ESLint + Prettier for code consistency.
- **Graceful Shutdown**: Handles `SIGINT` and `SIGTERM` to stop the bot cleanly.

## Project Structure

```
.
├── src/
│   ├── commands/     # Bot commands (e.g., /start)
│   ├── handlers/     # Message/callback handlers
│   ├── middlewares/  # Custom middleware (e.g., auth)
│   ├── services/     # Core services (bot instance, db)
│   └── utils/        # Logger, helpers
├── .env.example      # Environment variable template
├── .editorconfig     # Editor configuration
├── .eslintrc.cjs     # ESLint configuration
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── ecosystem.config.cjs # PM2 configuration
├── index.js          # Main entry point
├── LICENSE
└── package.json
```

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rcdevgames/template-bot.git
    cd template-bot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # bun install
    ```

3.  **Configure environment variables:**
    -   Copy `.env.example` to a new file named `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Open `.env` and add your Telegram bot token:
        ```
        BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
        ```

## Running the Bot

### Development (with auto-restart)

Uses `pm2` in watch mode.

```bash
pm2 start ecosystem.config.cjs --watch
pm2 logs template-bot
```

### Production

Uses `pm2` to run the bot as a background service.

```bash
# Start the bot
pm2 start ecosystem.config.cjs

# Monitor logs
pm2 logs template-bot

# Manage the process
pm2 status
pm2 restart template-bot
pm2 stop template-bot
```

### Docker

Build and run the container using Docker Compose.

```bash
# Build the image and run the container in detached mode
docker-compose up --build -d
```

The service will be named `template-bot` and connected to the `waw_bridge` external network.

## Environment Variables

-   `BOT_TOKEN` (Required): Your Telegram bot token.
-   `NODE_ENV`: Set to `production` for production deployments.
-   `LOG_LEVEL`: (Optional) Set log level (e.g., `info`, `warn`, `error`).
