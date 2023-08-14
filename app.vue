<script setup lang="ts">
  useHead({
    title: "Nuxt TODO App"
  })
</script>

<style lang="postcss">
  body {
    @apply bg-white dark:bg-slate-700 text-black dark:text-white;
  }
</style>

<template>
  <main class="w-full min-h-[100dvh] flex">
    <NuxtLoadingIndicator :color="false" class="bg-blue-500" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
