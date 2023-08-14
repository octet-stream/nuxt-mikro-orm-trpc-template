import {resolve, join} from "node:path"

import {defineConfig} from "@mikro-orm/better-sqlite"

import {Note} from "../../db/entity/Note.js"

const DB_ROOT = resolve("db")

export const config = defineConfig({
  dbName: join(DB_ROOT, "data.db"),
  ensureDatabase: true,
  entities: [Note],
  debug: process.env.NODE_ENV !== "production",
  migrations: {
    path: join(DB_ROOT, "migrations")
  },
  seeder: {
    path: join(DB_ROOT, "seeds")
  }
})
