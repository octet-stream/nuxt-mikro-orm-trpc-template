import {router} from "~/server/trpc/def.js"

import {getById} from "./note/getById.js"
import {create} from "./note/create.js"
import {update} from "./note/update.js"

export const note = router({
  getById,
  create,
  update
})
