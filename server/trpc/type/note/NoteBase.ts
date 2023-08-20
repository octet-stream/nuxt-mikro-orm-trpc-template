import {z} from "zod"

export const NoteBase = z.object({
  title: z.string().nonempty(),
  completed: z.boolean().default(false)
})

export type INoteBase = z.input<typeof NoteBase>

export type ONoteBase = z.output<typeof NoteBase>
