import "reflect-metadata"

import {RequestContext} from "@mikro-orm/core"
import type {EventHandler} from "h3"

import {getORM} from "~/server/lib/db/orm"

export const withORM = (handler: EventHandler) => defineEventHandler(
  async event => {
    const orm = await getORM()

    return RequestContext.createAsync(orm.em, () => handler(event))
  }
)
