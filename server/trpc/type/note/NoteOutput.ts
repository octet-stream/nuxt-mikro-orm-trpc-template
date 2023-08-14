import {z} from "zod"

import {Record} from "~/server/trpc/type/common/Record"

import {Note} from "./Note"

export const NoteOutput = Record.extend(Note.shape)

export type INoteOutput = z.input<typeof NoteOutput>

export type ONoteOutput = z.output<typeof NoteOutput>
