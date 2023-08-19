import {NotesPageInput} from "../../type/note/NotesPageInput.js"
import {NotePageOutput} from "../../type/note/NotePageOutput.js"
import {procedure} from "../../procedure/base.js"

import {Note} from "../../../db/entity/Note.js"

export const list = procedure
  .input(NotesPageInput)
  .output(NotePageOutput)
  .query(async ({input: {args}, ctx: {orm}}) => {
    const [items, count] = await orm.em.findAndCount(Note, {}, {
      limit: args.limit,
      offset: args.offset,
      fields: ["id", "title", "completed", "createdAt", "updatedAt"],
      orderBy: {
        createdAt: "desc"
      }
    })

    return {items, count, args}
  })
