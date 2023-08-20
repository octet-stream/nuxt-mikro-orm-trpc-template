import {z} from "zod"

export const NoteContent = z
  .string()
  .nullish()
  .transform(value => value == null ? undefined : value)

export type INoteContent = z.input<typeof NoteContent>

export type ONoteContent = z.output<typeof NoteContent>
