import { traceStorage, generateTraceId } from "../utils/logger.js";

export async function traceMiddleware(ctx, next) {
  const traceId = generateTraceId();
  // Attach to ctx so it can be accessed in global error handlers
  // where the async context might be lost
  ctx.traceId = traceId;

  // Wrap the entire middleware chain in the AsyncLocalStorage context
  await traceStorage.run(traceId, async () => {
    await next();
  });
}
