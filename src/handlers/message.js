import { logger } from "../utils/logger.js";

export function registerMessage(bot) {
  // Reply-keyboard handlers — enable when the keyboard in start.js is enabled.
  // bot.hears("📋 Help", async (ctx) => {
  //   await ctx.reply("Use /help to see available commands.");
  // });
  //
  // bot.hears("ℹ️ Info", async (ctx) => {
  //   const me = await bot.api.getMe();
  //   await ctx.reply(`Bot: ${me.first_name}\nUsername: @${me.username}`);
  // });
  //
  // bot.hears("🔔 Ping", async (ctx) => {
  //   await ctx.reply("🔔 Pong!");
  // });

  // Fallback: echo any text
  bot.on("message:text", async (ctx) => {
    await ctx.reply(`You said: ${ctx.message.text}`);
    logger.info(`Message from ${ctx.from.id}: ${ctx.message.text}`);
  });
}
        