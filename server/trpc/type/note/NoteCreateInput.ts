import {z} from "zod"

import {NoteBase} from "./NoteBase.js"

export const NoteCreateInput = NoteBase.partial({completed: true})

export type INoteCreateInput = z.input<typeof NoteCreateInput>

export type ONoteCreateInput = z.output<typeof NoteCreateInput>
