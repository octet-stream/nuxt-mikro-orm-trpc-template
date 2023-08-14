import {z} from "zod"

import {Note} from "./Note"

export const NoteCreateInput = Note
  .omit({
    id: true
  })
  .partial({
    completed: true
  })

export type INoteCreateInput = z.input<typeof NoteCreateInput>

export type ONoteCreateInput = z.output<typeof NoteCreateInput>
