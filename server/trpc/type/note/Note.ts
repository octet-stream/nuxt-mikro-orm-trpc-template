import {z} from "zod"

import {NoteBaseNode} from "./NoteBaseNode.js"
import {NoteContent} from "./NoteContent.js"

export const Note = NoteBaseNode.extend({
  content: NoteContent
})

export type INote = z.input<typeof Note>

export type ONote = z.output<typeof Note>
