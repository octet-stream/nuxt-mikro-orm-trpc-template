import {z} from "zod"

import {procedure} from "~/server/trpc/procedure/base.js"
import {NoteBase} from "~/server/trpc/type/note/NoteBase.js"
import {Note} from "~/server/db/entity/Note.js"

export const list = procedure
  .output(z.array(NoteBase))
  .query(({ctx: {orm}}) => orm.em.find(Note, {}))
