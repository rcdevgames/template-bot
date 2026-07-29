import { Bot, GrammyError, HttpError } from "grammy";
import { session } from "grammy";
import { limit as rateLimit } from "@grammyjs/ratelimiter";
import { logger } from "../utils/logger.js";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN not set in .env");

export const bot = new Bot(token);

// --- Session middleware ---
// Stores per-user state in memory (swap to file/redis adapter later if needed)
bot.use(
  session({
    initial: () => ({ step: null, data: {} }),
  })
);

// --- Rate limiter middleware ---
// 1 message per 2 seconds per user, queue up to 5
bot.use(
  rateLimit({
    timeFrame: 2000,
    limit: 1,
    onLimitExceeded: (ctx) => {
      ctx.reply("⏳ Sabar, jangan spam ya.");
    },
  })
);

// --- Global error handler ---
bot.catch((err) => {
  const ctx = err.ctx;
  logger.error(`Error while handling update ${ctx?.update?.update_id ?? "?"}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    logger.error("GrammyError:", e.description);
  } else if (e instanceof HttpError) {
    logger.error("HttpError:", e);
  } else {
    logger.error("Unknown error:", e);
  }
});

// Set bot commands (appears in Telegram menu button)
await bot.init();
await bot.api.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Show help & available commands" },
]);
