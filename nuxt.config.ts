// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV !== "production"
  },
  experimental: {
    componentIslands: true
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt"
  ],
  tailwindcss: {
    exposeConfig: true
  },
  build: {
    transpile: ["trpc-nuxt"]
  },
  // Enable desorators support thought nitro config, so we can use mikro-orm entity decorators
  // Note that esbuild does not support emitDecoratorMetadata option
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    }
  }
})
