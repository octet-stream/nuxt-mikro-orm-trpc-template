import type {EntityManager} from "@mikro-orm/core"
import {Seeder} from "@mikro-orm/seeder"

import {Note} from "../../server/db/entity/Note.js"
import {ONoteCreateInput} from "../../server/trpc/type/note/NoteCreateInput.js"

const data: ONoteCreateInput[] = [
  {
    title: "First note"
  },
  {
    title: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Completed note",
    content: "This note will be created as completed",
    completed: true
  }
]

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    data.forEach(note => em.create(Note, note))

    em.flush()
  }
}
