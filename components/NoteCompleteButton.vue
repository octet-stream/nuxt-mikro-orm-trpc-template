<script setup lang="ts">
import {Check, CheckCheck} from "lucide-vue-next"

interface Props {
  noteId: string
  completed: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "click", completed: boolean): void
}>()

const {$trpc} = useNuxtApp()

const toggle = async (): Promise<void> => {
  try {
    const {completed} = await $trpc.note.update.mutate({
      id: props.noteId,
      completed: !props.completed
    })

    emit("click", completed)
  } catch (error) {
    console.error(error)
  }
}

const Icon = computed(() => props.completed ? CheckCheck : Check)
</script>

<template>
  <button
    type="button"
    aria-label="Complete note"
    @click="toggle"
    :class='[
      "w-full flex rounded-md py-2 px-6 justify-center border",

      {
        "border-gray-300 dark:border-gray-500": completed,
        "border-black dark:border-gray-400": !completed
      }
    ]'
  >
    <div class="flex flex-row items-center">
      <component
        :is="Icon"
        :size="20"
        :class='{"text-gray-300 dark:text-gray-500": completed, "text-black dark:text-white": !completed}'
      />

      <div :class='["ml-2", {"line-through text-gray-300 dark:text-gray-500": completed}]'>
        <slot />
      </div>
    </div>
  </button>
</template>
