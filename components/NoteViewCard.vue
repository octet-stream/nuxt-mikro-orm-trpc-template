<script setup lang="ts">
import {ArrowLeft} from "lucide-vue-next"
import {unified} from "unified"
import {omit} from "lodash-es"

import remark from "remark-parse"
import rehype from "remark-rehype"
import sanitize from "rehype-sanitize"
import stringify from "rehype-stringify"

import type {ToggleCompletedHanlder} from "~/components/NoteCompleteButton.vue"
import type {OnUpdateHandler} from "~/components/NoteUpdateModal.vue"

const parser = unified()
  .use(remark)
  .use(rehype)
  .use(sanitize)
  .use(stringify)

interface Props {
  id: string
  title: string
  content?: string
  completed: boolean
  toggleCompleted: ToggleCompletedHanlder
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (
    event: "updated",

    ...args: Parameters<OnUpdateHandler>
  ): ReturnType<OnUpdateHandler>
}>()

const updated: OnUpdateHandler = note => emit("updated", note)

const html = computed(
  () => props.content ? parser.processSync(props.content) : undefined
)
</script>

<template>
  <Card class="w-full p-6 mobile:p-10 mobile:w-mobile mobile:max-w-full mobile:mx-auto">
    <nav class="flex w-full mb-10">
      <NuxtLink href="/" aria-label="Notes list">
        <ArrowLeft :size="28" />
      </NuxtLink>

      <div class="flex-1" />

      <NoteUpdateModal v-bind="omit($props, 'toggleCompleted')" @updated="updated" />
    </nav>

    <div class="w-full">
      <h2 class="text-3xl">
        {{title}}
      </h2>

      <div class="mb-10">
        <div v-if="html" class="prose dark:prose-invert" v-html="html" />

        <div v-else class="text-gray-400 dark:text-gray-600">
          No details
        </div>
      </div>

      <NoteCompleteButton :completed="completed" :toggle-completed="toggleCompleted">
        Mark as completed
      </NoteCompleteButton>
    </div>
  </Card>
</template>
