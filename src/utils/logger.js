const ts = () => new Date().toISOString();

export const logger = {
  info: (msg) => console.log(`[${ts()}] INFO  ${msg}`),
  warn: (msg, ...args) => console.warn(`[${ts()}] WARN  ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[${ts()}] ERROR ${msg}`, ...args),
};
