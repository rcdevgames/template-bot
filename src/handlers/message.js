import { logger } from "../utils/logger.js";

export function registerMessage(bot) {
  // Handle keyboard button presses
  bot.hears("📋 Help", async (ctx) => {
    await ctx.reply(
      "*📖 Help Menu*\n\n" +
        "*/start* — Start bot\n" +
        "*/help* — Show this message",
      { parse_mode: "Markdown" }
    );
  });

  bot.hears("ℹ️ Info", async (ctx) => {
    const me = await bot.api.getMe();
    await ctx.reply(
      `*Bot Info*\n\n` +
        `Name: ${me.first_name}\n` +
        `Username: @${me.username}\n` +
        `ID: ${me.id}`,
      { parse_mode: "Markdown" }
    );
  });

  bot.hears("🔔 Ping", async (ctx) => {
    await ctx.reply("🔔 Pong!");
  });

  // Fallback: echo any text
  bot.on("message:text", async (ctx) => {
    await ctx.reply(`You said: ${ctx.message.text}`);
    logger.info(`Message from ${ctx.from.id}: ${ctx.message.text}`);
  });
}
