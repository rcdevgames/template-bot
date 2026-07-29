import "dotenv/config";

import { bot } from "./src/services/bot.js";
import { registerStart } from "./src/commands/start.js";
import { registerHelp } from "./src/commands/help.js";
import { registerMessage } from "./src/handlers/message.js";
import { registerCallback } from "./src/handlers/callback.js";
import { logger } from "./src/utils/logger.js";

// Register handlers
registerStart(bot);
registerHelp(bot);
registerMessage(bot);
registerCallback(bot);

// Graceful shutdown
const shutdown = (signal) => {
  logger.info(`${signal} received, stopping bot...`);
  bot.stop();
  process.exit(0);
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Start polling
bot.start({
  onStart: (info) => {
    logger.info(`Bot @${info.username} started`);
  },
});
