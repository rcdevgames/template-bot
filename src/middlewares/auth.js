// Simple auth middleware — extend with user whitelist if needed
export function authMiddleware(ctx, next) {
  // Allow all users for template. Add whitelist logic here.
  // const allowed = [123456789];
  // if (!allowed.includes(ctx.from?.id)) return;
  return next();
}
