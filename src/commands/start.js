// import { Keyboard } from "grammy";
import { logger } from "../utils/logger.js";

export function registerStart(bot) {
  bot.command("start", async (ctx) => {
    const name = ctx.from?.first_name ?? "there";

    // Persistent reply keyboard (shows as menu button next to emoji picker)
    /*
    const menu = new Keyboard()
      .text("📋 Help")
      .text("ℹ️ Info")
      .row()
      .text("🔔 Ping")
      .resized();
    */

    await ctx.reply(
      `👋 Halo *${name}*!\n\n` +
        `Bot template ini siap pakai.\n` +
        `Gunakan /help untuk melihat perintah.`,
      { parse_mode: "Markdown" /*, reply_markup: menu */ }
    );

    logger.info(`/start from ${ctx.from.id} (${ctx.from.username ?? "no-username"})`);
  });
}
