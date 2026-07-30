# Development Guidelines

## Stack

- Runtime: Bun
- Language: JavaScript ESM (`.js`)
- Telegram: grammY
- ORM: Drizzle ORM
- Database: PostgreSQL, MySQL/MariaDB, or SQLite
- Process manager: PM2
- Container: Docker + distroless runtime

## Non-negotiable

- Do not add TypeScript files, `tsconfig.json`, or TypeScript dependencies.
- Keep secrets in `.env`; commit only `.env.example`.
- Never log bot tokens, passwords, JWT secrets, encryption keys, or full sensitive payloads.
- Validate all external input at trust boundaries.
- Keep handlers thin; put reusable logic in services/utils.
- Prefer existing dependencies and platform APIs before adding packages.

## Project Structure

```text
src/
├── commands/       # Telegram commands: /start, /help
├── handlers/       # messages, callbacks, updates
├── middlewares/    # auth, rate limit, trace ID
├── plugins/        # reusable bot features
├── services/       # bot, DB, security, external services
├── db/             # Drizzle schema
└── utils/          # logger and helpers
```

## Local Setup

```bash
cp .env.example .env
# Fill BOT_TOKEN and required secrets
bun install
bun run lint
bun run dev
```

Required security values:

```env
JWT_SECRET=<minimum 32 random characters>
ENCRYPTION_KEY=<exactly 32 characters>
```

Generate safe values:

```bash
bun -e 'console.log(require("node:crypto").randomBytes(32).toString("base64url"))'
```

## Commands

```bash
bun run dev                 # Bun watch mode
bun run lint                # ESLint
bun run format              # Prettier
bun run build               # Compile standalone binary
bunx drizzle-kit generate  # Generate migration
bunx drizzle-kit migrate   # Run migration
bunx drizzle-kit push      # Push schema directly; development only
```

## Telegram Commands

1. Add a command handler in `src/commands/`.
2. Register it in `index.js`.
3. Add its description to `setMyCommands()` in `src/services/bot.js`.
4. Keep response formatting valid for the selected Telegram parse mode.

## Middleware Order

Trace middleware must remain first so every update receives one trace ID. Recommended order:

1. Trace ID
2. Rate limiter
3. Authentication/authorization
4. Session
5. Commands and handlers

## Database

Set `DB_DRIVER` to one of:

```env
DB_DRIVER=postgres
DB_DRIVER=mysql
DB_DRIVER=sqlite
```

Use Drizzle schema files in `src/db/schema.js`. Do not write raw SQL in handlers. Add indexes and constraints in the schema where possible.

## Security

- Use `encrypt()`/`decrypt()` from `src/services/security.js` for sensitive reversible data.
- Use `signToken()`/`verifyToken()` for JWT.
- Never reuse `JWT_SECRET` as `ENCRYPTION_KEY`.
- Keep `ADMIN_ID` in `.env`; enforce it through auth middleware when needed.
- Return generic errors to Telegram users; keep details in logs with trace ID.

## Plugin Convention

```js
export default {
  name: "example",
  register(bot) {
    bot.command("example", (ctx) => ctx.reply("OK"));
  },
};
```

Register plugins through `loadPlugins(bot, plugins)`. Plugin names must be unique and plugin registration must not contain secrets.

## Verification Checklist

Before commit:

```bash
bun run lint
node --check index.js
```

Before deploy:

```bash
bun run build
docker compose config --quiet
```

Confirm:

- PM2 status is `online` or Docker container is healthy.
- Logs show the bot username and no startup error.
- `/start` and `/help` respond.
- Trace ID appears on request logs.
- `.env` is not tracked by Git.

## Git

Use focused commits:

```text
feat: add command
fix: handle callback error
docs: update development guidelines
chore: update dependencies
```

Review `git diff` before commit. Never commit `.env`, database files, build output, or credentials.
