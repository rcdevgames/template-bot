import "dotenv/config";

export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: process.env.DB_DRIVER === "sqlite" ? "sqlite" : process.env.DB_DRIVER === "mysql" ? "mysql" : "postgresql",
  dbCredentials:
    process.env.DB_DRIVER === "sqlite"
      ? { url: process.env.DB_PATH ?? "./data/app.sqlite" }
      : { url: process.env.DATABASE_URL },
};

// Commands:
// bunx drizzle-kit generate
// bunx drizzle-kit migrate
// bunx drizzle-kit push
        