import {MikroORM} from "@mikro-orm/better-sqlite"

import {config} from "./config.js"

let orm: MikroORM | null = null

export async function getORM(): Promise<MikroORM> {
  if (!orm) {
    orm = await MikroORM.init(config)
  }

  return orm
}

export async function closeConnection(): Promise<void> {
  if (!orm || await orm.isConnected() === false) {
    return
  }

  return orm.close()
}
