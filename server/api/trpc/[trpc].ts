import {createNuxtApiHandler} from "trpc-nuxt"

import {createContext} from "~/server/trpc/context"
import {router} from "~/server/trpc/router"

export default createNuxtApiHandler({router, createContext})
