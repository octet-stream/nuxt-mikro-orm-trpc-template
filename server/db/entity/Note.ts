import {Entity, Property, OptionalProps} from "@mikro-orm/core"

import {Record} from "./Record.js"

@Entity()
export class Note extends Record {
  [OptionalProps]?: "createdAt" | "updatedAt" | "content" | "completed"

  @Property({type: "varchar"})
  title!: string

  @Property({type: "text", nullable: true})
  content: string | null = null

  @Property({type: "boolean"})
  completed = false
}
