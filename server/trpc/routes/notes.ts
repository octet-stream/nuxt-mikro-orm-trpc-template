import {router} from "~/server/trpc/def.js"

import {list} from "./notes/list.js"

export const notes = router({
  list
})
