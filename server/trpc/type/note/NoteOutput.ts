import {z} from "zod"

import {NoteBaseRecord} from "./NoteBaseRecord.js"
import {Note} from "./Note.js"

export const NoteOutput = NoteBaseRecord.extend(Note.shape)

export type INoteOutput = z.input<typeof NoteOutput>

export type ONoteOutput = z.output<typeof NoteOutput>
