<script setup lang="ts">
import {Check} from "lucide-vue-next"

interface Props {
  id: string
  title: string
  completed: boolean
}

const props = defineProps<Props>()

const noteUrl = `/view/${props.id}`
</script>

<template>
  <Card class="flex flex-row relative">
    <NuxtLink :href="noteUrl" class="absolute inset-0" :aria-label="title" />

    <div class="pl-4 pr-1 relative flex justify-center items-center pointer-events-none">
      <button
        :class='[
          "relative z-0 cursor-pointer w-6 h-6 flex items-center justify-center rounded-full border disabled:cursor-not-allowed pointer-events-auto",

          {
            "line-through border-gray-300 dark:border-gray-500": completed
          }
        ]'
      >
        <Check
          v-show="completed"
          :size="16"
          :class='[
            "text-gray-300",

            {
              "line-through text-gray-300 dark:text-gray-500": completed
            }
          ]'
        />
      </button>
    </div>

    <NuxtLink :href="noteUrl" class="flex flex-1 pointer-event-none">
      <div :class='["py-4 pl-1 pr-4", {"line-through text-gray-300 dark:text-gray-500": completed}]'>
        {{title}}
      </div>
    </NuxtLink>
  </Card>
</template>
