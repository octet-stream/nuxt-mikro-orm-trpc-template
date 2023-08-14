import {Note} from "~/server/db/entity/Note"
import {procedure} from "~/server/trpc/procedure/base"
import {NoteOutput} from "~/server/trpc/type/note/NoteOutput"
import {NoteCreateInput} from "~/server/trpc/type/note/NoteCreateInput"

export const create = procedure
  .input(NoteCreateInput)
  .output(NoteOutput)
  .mutation(({input, ctx: {orm}}) => {
    const note = orm.em.create(Note, input)

    orm.em.persistAndFlush([note])

    return note
  })
