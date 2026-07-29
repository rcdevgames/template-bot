export function registerHelp(bot) {
  bot.command("help", async (ctx) => {
    const text =
      "*📖 Help Menu*\n\n" +
      "*/start* — Start bot, show keyboard menu\n" +
      "*/help* — Show this message\n\n" +
      "*Keyboard buttons:*\n" +
      "📋 Help — Show this message\n" +
      "ℹ️ Info — Show bot info\n" +
      "🔔 Ping — Bot replies pong";

    await ctx.reply(text, { parse_mode: "Markdown" });
  });
}
