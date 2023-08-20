import {z} from "zod"

import {Record} from "../common/Record.js"

import {NoteBase} from "./NoteBase.js"

export const NoteBaseRecord = Record.extend(NoteBase.shape)

export type INoteBaseRecord = z.input<typeof NoteBaseRecord>

export type ONoteBaseRecord = z.output<typeof NoteBaseRecord>
