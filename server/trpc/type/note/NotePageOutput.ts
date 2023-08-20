import {z} from "zod"

import {createPageOutput} from "../../helper/createPageOutput.js"

import {NotesPageInput} from "./NotesPageInput.js"
import {NoteBaseRecord} from "./NoteBaseRecord.js"

export const NotePageOutput = createPageOutput(NoteBaseRecord, NotesPageInput)

export type INotePageOutput = z.input<typeof NotePageOutput>

export type ONotePageOutput = z.output<typeof NotePageOutput>
