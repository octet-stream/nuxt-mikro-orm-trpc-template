<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from "@headlessui/vue"
import {X} from "lucide-vue-next"

const opened = ref(false)

/**
 * Opens modal
 */
function open(): void {
  opened.value = true
}

/**
 * Closes modal
 */
function close(): void {
  opened.value = false
}

defineExpose({open, close})
</script>

<template>
  <slot name="openButton" :openDialog="open" />

  <TransitionRoot appear :show="opened" as="template">
    <Dialog as="div" @close="close" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40 dark:bg-black/70" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden transition-all rounded-md text-left align-middle border-8 bg-white border-white text-black dark:bg-slate-700 dark:border-slate-700 dark:text-white">
              <DialogTitle as="div" class="flex p-6 bg-black text-white dark:bg-gray-800 rounded-md overflow-hidden text-xl font-bold select-none">
                <h3>
                  <slot name="title" />
                </h3>

                <div class="flex-1" />

                <button type="button" @click="close">
                  <X :size=28 class="text-white" />
                </button>
              </DialogTitle>

              <slot :open="open" :close="close" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
