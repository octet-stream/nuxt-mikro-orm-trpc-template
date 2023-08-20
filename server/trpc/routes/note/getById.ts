import {TRPCError} from "@trpc/server"

import {NoteOutput} from "~/server/trpc/type/note/NoteOutput.js"
import {procedure} from "~/server/trpc/procedure/base.js"
import {Node} from "~/server/trpc/type/common/Node.js"
import {Note} from "~/server/db/entity/Note.js"

export const getById = procedure
  .input(Node)
  .output(NoteOutput)
  .query(async ({input, ctx: {orm}}) => {
    const note = await orm.em.findOneOrFail(Note, input.id, {
      failHandler: () => new TRPCError({
        code: "NOT_FOUND",
        message: "Unable to find requested note"
      })
    })

    return note
  })
