<script setup lang="ts">
import {Check, CheckCheck} from "lucide-vue-next"

import type {MaybePromise} from "lib/util/type/MaybePromise"

export type ToggleCompletedHanlder = (completed: boolean) => MaybePromise<void>

interface Props {
  completed: boolean
  toggleCompleted: ToggleCompletedHanlder
}

const props = defineProps<Props>()

const Icon = computed(() => props.completed ? CheckCheck : Check)

const toggle = () => props.toggleCompleted(!props.completed)
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
        <slot /> {{ completed }}
      </div>
    </div>
  </button>
</template>
