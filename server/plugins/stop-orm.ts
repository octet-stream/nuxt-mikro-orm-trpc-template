import {closeConnection} from "~/server/lib/db/orm"

export default defineNitroPlugin(nitro => {
  nitro.hooks.hookOnce("close", closeConnection)
})
