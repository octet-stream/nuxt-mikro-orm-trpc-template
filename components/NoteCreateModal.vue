<script setup lang="ts">
import type {ONoteOutput} from "server/trpc/type/note/NoteOutput"
import type {SubmitHandler} from "~/components/NoteEditModal.vue"

const {$trpc} = useNuxtApp()

const emit = defineEmits<{
  (event: "created", note: ONoteOutput): void
}>()

const submit: SubmitHandler = async data => {
  emit("created", await $trpc.note.create.mutate(data))
}
</script>

<template>
  <NoteEditModal @submit="submit">
    <template #title>
      Create a note
    </template>

    <template #openButton="{openDialog}">
      <FloatingButton @click="openDialog" />
    </template>
  </NoteEditModal>
</template>
