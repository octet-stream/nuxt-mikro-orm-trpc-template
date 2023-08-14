import {trpc} from "./def"

import {notes} from "./routes/notes.js"
import {note} from "./routes/note.js"

export const router = trpc.router({notes, note})

export type Router = typeof router
