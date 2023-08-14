import {createTRPCNuxtClient, httpBatchLink} from "trpc-nuxt/client"

import SuperJSON from "superjson"

import type {Router} from "~/server/trpc/router"

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<Router>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc: client
    }
  }
})
