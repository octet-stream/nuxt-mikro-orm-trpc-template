<script setup lang="ts">
interface Props {
  /**
   * Foo
   */
  x?: string

  fooBar?: number
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gray-50 dark:bg-slate-800 dark:text-white shadow-md rounded-md">
    <slot />
  </div>
</template>
