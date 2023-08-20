<script setup lang="ts">
import type {NuxtError} from "nuxt/app"
import {capitalize} from "lodash-es"

interface Props {
  error: NuxtError
}

const {error} = defineProps<Props>()

const message = capitalize(error.statusMessage || "Internal server error")
const status = error.statusCode ?? 500

useHead({
  title: message
})
</script>

<template>
  <main class="w-screen h-[100dvh] flex">
    <div class="w-full mobile:w-mobile m-auto text-center">
      <div class="text-5xl text-red-400 dark:text-red-500 font-bold">{{status}}</div>

      <div class="text-2xl font-normal text-gray-500 dark:text-white">
        {{message}}
      </div>

      <div class="mt-5">
        <NuxtLink href="/">
          Open the home page
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
