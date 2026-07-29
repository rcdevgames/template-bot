import { logger } from "../utils/logger.js";

export function registerCallback(bot) {
  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    logger.info(`Callback: ${data} from ${ctx.from.id}`);

    await ctx.answerCallbackQuery();
    await ctx.reply(`Button pressed: ${data}`);
  });
}
