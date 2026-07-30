import { AsyncLocalStorage } from "node:async_hooks";
import crypto from "node:crypto";

export const traceStorage = new AsyncLocalStorage();
export const generateTraceId = () => crypto.randomUUID().split("-")[0];

const ts = () => {
  const d = new Date();
  // Format: YYYY-MM-DD HH:mm:ss.SSS (Localize if needed, currently UTC-based ISO strip)
  return d.toISOString().replace("T", " ").replace("Z", "");
};

const formatMessage = (level, msg, args) => {
  const traceId = traceStorage.getStore() || "SYSTEM--";
  const strArgs = args.length
    ? " " + args.map((a) => (typeof a === "object" ? JSON.stringify(a) : a)).join(" ")
    : "";
  return `[${ts()}] [${traceId}] [${level.padEnd(5)}] ${msg}${strArgs}`;
};

export const logger = {
  info: (msg, ...args) => console.log(formatMessage("INFO", msg, args)),
  warn: (msg, ...args) => console.warn(formatMessage("WARN", msg, args)),
  error: (msg, ...args) => console.error(formatMessage("ERROR", msg, args)),
};
