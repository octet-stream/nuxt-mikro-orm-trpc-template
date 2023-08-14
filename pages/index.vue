<script setup lang="ts">
import type {ONoteOutput} from "~/server/trpc/type/note/NoteOutput.js"

const {$trpc} = useNuxtApp()

const notes = reactive(await $trpc.notes.list.query())

const addNote = (note: ONoteOutput): void => {
  notes.push(note)
}
</script>

<template>
  <ul>
    <li v-for="note of notes" :key="note.id" class="py-1 first:pt-0 last:pb-0">
      <NoteListCard v-bind="note" />
    </li>
  </ul>

  <NoteCreateModal @created="addNote" />
</template>
