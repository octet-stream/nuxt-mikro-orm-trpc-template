<script setup lang="ts">
import {Pencil} from "lucide-vue-next"

import type {ONoteUpdateInput} from "~/server/trpc/type/note/NoteUpdateInput.js"
import type {SubmitHandler} from "~/components/NoteEditModal.vue"

interface Props {
  id: string
  title: string
  content?: string
  completed: boolean
}

export type OnUpdateHandler = (note: ONoteUpdateInput) => void

const {$trpc} = useNuxtApp()

const props = defineProps<Props>()
const emit = defineEmits<{
  (
    event: "updated",

    ...args: Parameters<OnUpdateHandler>
  ): ReturnType<OnUpdateHandler>
}>()

const submit: SubmitHandler = async data => {
  emit("updated", await $trpc.note.update.mutate({...data, id: props.id}))
}
</script>

<template>
  <NoteEditModal @submit="submit" :initialValues="{title, content, completed}">
    <template #title>
      Create a note
    </template>

    <template #openButton="{openDialog}">
      <button type="button" aria-label="Edit the note" @click="openDialog">
        <Pencil :size="28" />
      </button>
    </template>
  </NoteEditModal>
</template>
