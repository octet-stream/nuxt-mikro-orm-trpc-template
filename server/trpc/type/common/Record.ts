import {Node} from "./Node"
import {DateTime} from "./DateTime"

export const Record = Node.extend({
  createdAt: DateTime,
  updatedAt: DateTime
})
