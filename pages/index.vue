<script setup lang="ts">
import type {ONoteOutput} from "~/server/trpc/type/note/NoteOutput.js"

const {$trpc} = useNuxtApp()

const notes = reactive(await $trpc.notes.list.query())

const addNote = (note: ONoteOutput): void => {
  notes.items.unshift(note)

  const {maxLimit, itemsCount, nextCursor, current} = notes
  if (maxLimit && maxLimit < itemsCount + 1) {
    notes.items.pop()
    notes.nextCursor = nextCursor ? current + 1 : 1
  } else {
    notes.hasItems = true
    notes.itemsCount++
    notes.rowsCount++
  }
}
</script>

<template>
  <ul v-if="notes.hasItems">
    <li v-for="note of notes.items" :key="note.id" class="py-1 first:pt-0 last:pb-0">
      <NoteListCard v-bind="note" v-model:completed="note.completed" />
    </li>
  </ul>

  <div v-else class="w-full h-full flex justify-center items-center select-none">
    <div class="border rounded-md text-gray-400 border-gray-400 dark:text-slate-500 dark:border-slate-500 p-5 text-center">
      <div>There are no notes just yet</div>
      <div>To add one, click on the button down below</div>
    </div>
  </div>

  <NoteCreateModal @created="addNote" />
</template>
