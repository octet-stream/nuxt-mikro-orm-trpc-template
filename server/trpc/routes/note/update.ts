import {TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {NoteUpdateInput} from "../../type/note/NoteUpdateInput.js"
import {NoteOutput} from "../../type/note/NoteOutput.js"
import {procedure} from "../../procedure/base.js"

import {Note} from "../../../db/entity/Note.js"

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
