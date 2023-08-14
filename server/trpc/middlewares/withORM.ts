import {RequestContext} from "@mikro-orm/core"

import {middleware} from "~/server/trpc/def.js"
import {getORM} from "~/server/lib/db/orm.js"

export const withORM = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx: {...ctx, orm}}))
})
