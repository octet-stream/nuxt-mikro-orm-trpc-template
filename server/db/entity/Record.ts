import {Entity, Property} from "@mikro-orm/core"

import {Node} from "./Node.js"

@Entity({abstract: true})
export abstract class Record extends Node {
  @Property({type: "datetime"})
  readonly createdAt = new Date()

  @Property({type: "datetime", onUpdate: () => new Date()})
  readonly updatedAt = new Date()
}
