import {z} from "zod"

import {NoteBase} from "./NoteBase"

export const Note = NoteBase.extend({
  content: z.string().nullish().transform(value => value == null ? undefined : value)
})

export type INote = z.input<typeof Note>

export type ONote = z.output<typeof Note>
