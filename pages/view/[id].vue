<script setup lang="ts">
import type {ONoteOutput} from "~/server/trpc/type/note/NoteOutput.js"
import type {OnUpdateHandler} from "~/components/NoteUpdateModal.vue"

const route = useRoute()

const {$trpc} = useNuxtApp()

const note = reactive(await $trpc.note.getById.query({id: String(route.params.id)}))

useHead({
  title: note.title
})

const toggleCompleted = async (flag: boolean) => {
  const {completed} = await $trpc.note.update.mutate({
    id: note.id,
    completed: flag
  })

  note.completed = completed
}

const redirect = ({id}: ONoteOutput) => navigateTo(`/view/${id}`, {
  replace: true
})

const updated: OnUpdateHandler = ({title, content, completed}) => {
  note.title = title
  note.content = content
  note.completed = completed
}
</script>

<template>
  <article class="flex flex-col flex-1 justify-center items-center">
    <NoteViewCard v-bind="note" :toggleCompleted="toggleCompleted" @updated="updated" />
  </article>

  <NoteCreateModal @created="redirect" />
</template>
