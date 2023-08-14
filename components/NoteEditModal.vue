<script setup lang="ts">
import {useForm} from "@vorms/core"
import {zodResolver} from "@vorms/resolvers/zod"

import isEmpty from "lodash/isEmpty"

import type {MaybePromise} from "~/lib/util/type/MaybePromise.js"
import {NoteCreateInput} from "~/server/trpc/type/note/NoteCreateInput.js"
import type {ONoteCreateInput} from "~/server/trpc/type/note/NoteCreateInput.js"
import {useTextareadAutoResize} from "~/lib/composables/useTextareaAutoresize.js"

import Modal from "~/components/Modal.vue"

interface Props {
  initialValues?: {
    title?: string
    content?: string
    completed?: boolean
  }
}

export type SubmitHandler = (data: ONoteCreateInput) => MaybePromise<void>

type Emits = {
  (e: "submit", ...args: Parameters<SubmitHandler>): ReturnType<SubmitHandler>
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const modalRef = ref<InstanceType<typeof Modal>>()

function closeModal(): void {
  modalRef.value?.close()
}

const {initialValues} = props
const {handleSubmit, register, errors, resetForm} = useForm<ONoteCreateInput>({
  validateMode: "input",
  reValidateMode: "input",
  validateOnMounted: true,
  initialValues: {
    title: initialValues?.title ?? "",
    completed: initialValues?.completed,
    content: initialValues?.content
  },
  validate: zodResolver(NoteCreateInput),
  onSubmit: data => Promise
    .resolve(emit("submit", data))
    .then(() => { closeModal() })
    .then(() => { setTimeout(resetForm, 210) })
})

const {value: titleValue, attrs: titleAttrs} = register("title")

const {value: contentValue, attrs: contentAttrs} = register("content")

const isValid = computed(() => isEmpty(errors.value))

const {ref: titleAutoSize} = useTextareadAutoResize({
  watch: titleValue,
  maxRows: 3
})

const {ref: contentAutoSize} = useTextareadAutoResize({
  watch: contentValue,
  maxRows: 10
})
</script>

<template>
  <Modal ref="modalRef">
    <template #openButton="openButton">
      <slot name="openButton" v-bind="openButton" />
    </template>

    <template #title>
      <slot name="title" />
    </template>

    <template #default="{close}">
      <form @submit="handleSubmit" class="flex flex-col overflow-y-auto p-6">
        <textarea
          ref="titleAutoSize"
          v-model="titleValue"
          v-bind="titleAttrs"
          rows="1"
          maxlength="255"
          placeholder="Title"
          class="w-full border p-2 rounded-md resize-none overflow-hidden dark:bg-slate-700 dark:border-gray-400"
        />

        <textarea
          ref="contentAutoSize"
          v-model="contentValue"
          v-bind="contentAttrs"
          rows="5"
          maxlength="1000"
          placeholder="Content"
          class="mt-4 w-full border p-2 rounded-md resize-none dark:bg-slate-700 dark:border-gray-400"
        />

        <div class="flex flex-row mt-4">
          <Button type="submit" variant="primary" :disabled="!isValid">
            Submit
          </Button>

          <div className="flex-1" />

          <Button type="button" variant="secondary" class="dark:border-gray-400" @click="close">
            Cancel
          </Button>
        </div>
      </form>
    </template>
  </Modal>
</template>
