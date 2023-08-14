import {Entity, PrimaryKey} from "@mikro-orm/core"
import {nanoid} from "nanoid"

@Entity({abstract: true})
export abstract class Node {
  @PrimaryKey({type: "varchar"})
  readonly id: string = nanoid()
}
