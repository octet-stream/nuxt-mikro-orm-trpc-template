<script setup lang="ts">
import {merge} from "lodash-es"
import {unified} from "unified"

import remark from "remark-parse"
import rehype from "remark-rehype"
import sanitize from "rehype-sanitize"
import stringify from "rehype-stringify"

import type {ONoteOutput} from "~/server/trpc/type/note/NoteOutput.js"
import type {OnUpdateHandler} from "~/components/NoteUpdateModal.vue"

import {getNoteById} from "../../api/getNoteById.js"

const parser = unified()
  .use(remark)
  .use(rehype)
  .use(sanitize)
  .use(stringify)

const route = useRoute()

const note = reactive(await getNoteById({id: String(route.params.id)}))

useHead({
  title: note.title
})

const redirect = ({id}: ONoteOutput) => navigateTo(`/view/${id}`, {
  replace: true
})

const updated: OnUpdateHandler = ({title, content, completed}) => {
  merge(note, {title, content, completed})
}

const html = computed(() => (
  note.content ? parser.processSync(note.content).value : undefined
))
</script>

<template>
  <article class="flex flex-col flex-1 justify-center items-center">
    <NoteViewCard v-bind="note" @updated="updated">
      <div v-if="html" v-html="html" class="prose dark:prose-invert" />

      <div v-else class="text-gray-400 dark:text-gray-600">
        No details
      </div>
    </NoteViewCard>
  </article>

  <NoteCreateModal @created="redirect" />
</template>
