import {z} from "zod"

import {createPageOutput} from "../../helper/createPageOutput.js"

import {NotesPageInput} from "./NotesPageInput.js"
import {NoteBase} from "./NoteBase.js"

export const NotePageOutput = createPageOutput(NoteBase, NotesPageInput)

export type INotePageOutput = z.input<typeof NotePageOutput>

export type ONotePageOutput = z.output<typeof NotePageOutput>
