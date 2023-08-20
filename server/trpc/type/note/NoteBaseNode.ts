import {z} from "zod"

import {Node} from "../common/Node.js"

import {NoteBase} from "./NoteBase.js"

export const NoteBaseNode = Node.extend(NoteBase.shape)

export type INoteBaseNode = z.input<typeof NoteBaseNode>

export type ONoteBaseNode = z.output<typeof NoteBaseNode>
