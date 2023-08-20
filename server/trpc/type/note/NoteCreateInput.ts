import {z} from "zod"

import {Note} from "./Note.js"

export const NoteCreateInput = Note.partial({completed: true}).omit({id: true})

export type INoteCreateInput = z.input<typeof NoteCreateInput>

export type ONoteCreateInput = z.output<typeof NoteCreateInput>
