import {TRPCError} from "@trpc/server"

import {NoteOutput} from "../../type/note/NoteOutput.js"
import {procedure} from "../../procedure/base.js"
import {Node} from "../../type/common/Node.js"

import {Note} from "../../../db/entity/Note.js"

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
