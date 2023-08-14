import {withORM} from "~/server/trpc/middlewares/withORM.js"
import {trpc} from "~/server/trpc/def.js"

export const procedure = trpc.procedure.use(withORM)

export const baseProcedure = procedure
