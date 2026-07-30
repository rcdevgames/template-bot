import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import mysql from "mysql2/promise";
import Database from "better-sqlite3";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";

const driver = process.env.DB_DRIVER ?? "postgres";

export function createDb() {
  if (driver === "postgres") {
    const pool = new pg.Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    return { db: drizzle(pool), close: () => pool.end() };
  }

  if (driver === "mysql") {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    return { db: drizzleMysql(pool), close: () => pool.end() };
  }

  if (driver === "sqlite") {
    const sqlite = new Database(process.env.DB_PATH ?? "./data/app.sqlite");
    return { db: drizzleSqlite(sqlite), close: () => sqlite.close() };
  }

  throw new Error(`Unsupported DB_DRIVER: ${driver}`);
}

export const database = createDb();
export const db = database.db;
export const closeDb = database.close;
