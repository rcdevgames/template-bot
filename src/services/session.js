// File-based session storage (simple JSON file)
// For production, consider using @grammyjs/storage-redis
import { FileAdapter } from "@grammyjs/storage-file";

const sessionPath = "./.session.json";

export const sessionAdapter = new FileAdapter({ dir: sessionPath });
