import {z} from "zod"

import {Node} from "~/server/trpc/type/common/Node"

export const NoteBase = Node.extend({
  title: z.string().nonempty(),
  completed: z.boolean().default(false)
})

export type INoteBase = z.input<typeof NoteBase>

export type ONoteBase = z.output<typeof NoteBase>
