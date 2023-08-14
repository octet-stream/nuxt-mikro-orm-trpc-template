import {TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {NoteUpdateInput} from "~/server/trpc/type/note/NoteUpdateInput.js"
import {NoteOutput} from "~/server/trpc/type/note/NoteOutput.js"
import {procedure} from "~/server/trpc/procedure/base.js"
import {Note} from "~/server/db/entity/Note.js"

export const update = procedure
  .input(NoteUpdateInput)
  .output(NoteOutput)
  .mutation(async ({input, ctx: {orm}}) => {
    const {id, ...fields} = input

    const note = await orm.em.findOneOrFail(Note, id, {
      failHandler: () => new TRPCError({code: "NOT_FOUND"})
    })

    wrap(note).assign(fields)

    await orm.em.flush()

    return note
  })
