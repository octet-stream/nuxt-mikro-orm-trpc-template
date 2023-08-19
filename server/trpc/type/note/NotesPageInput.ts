import {z} from "zod"

import {createPageInput} from "../../helper/createPageInput.js"

export const NotesPageInput = createPageInput({maxLimit: 500})

export type INotesPageInput = z.input<typeof NotesPageInput>

export type ONotesPageInput = z.output<typeof NotesPageInput>
