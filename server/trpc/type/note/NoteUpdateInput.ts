import {z} from "zod"

import {Note} from "./Note"

export const NoteUpdateInput = Note.partial().required({id: true})

export type INoteUpdateInput = z.input<typeof NoteUpdateInput>

export type ONoteUpdateInput = z.output<typeof NoteUpdateInput>
