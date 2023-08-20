import {z} from "zod"

export const Node = z.object({
  id: z.string().length(21)
})

export type INode = z.input<typeof Node>

export type ONode = z.output<typeof Node>
