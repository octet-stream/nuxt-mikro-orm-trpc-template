import {z} from "zod"

export const Node = z.object({
  id: z.string().length(21)
})
