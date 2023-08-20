import {NoteCreateInput} from "../../type/note/NoteCreateInput.js"
import {NoteOutput} from "../../type/note/NoteOutput.js"
import {procedure} from "../../procedure/base.js"

import {Note} from "../../../db/entity/Note.js"

export const create = procedure
  .input(NoteCreateInput)
  .output(NoteOutput)
  .mutation(({input, ctx: {orm}}) => {
    const note = orm.em.create(Note, input)

    orm.em.persistAndFlush([note])

    return note
  })
