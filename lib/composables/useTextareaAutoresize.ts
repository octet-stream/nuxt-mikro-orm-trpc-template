import {ref, watch, nextTick, type WatchSource, type Ref} from "vue"
import {useResizeObserver} from "@vueuse/core"

import type {MaybeRef} from "~/lib/util/type/MaybeRef.js"
import type {MaybeArray} from "~/lib/util/type/MaybeArray.js"

export interface UseTextareaAutoresizeResultParams {
  value?: MaybeRef<string>
  watch?: MaybeArray<WatchSource>
  maxRows?: number
}

export interface UseTextareaAutoresizeResult {
  ref: Ref<HTMLTextAreaElement | undefined>
  value: Ref<string | undefined>
}

interface Defaults extends UseTextareaAutoresizeResultParams {
  maxRows: number
}

const defaults: Defaults = {
  maxRows: Infinity
}

export function useTextareadAutoResize(
  params: UseTextareaAutoresizeResultParams
): UseTextareaAutoresizeResult {
  const {value, maxRows, ...rest} = {...defaults, ...params}

  const textareaRef = ref<HTMLTextAreaElement>()
  const initialScrollHeight = ref<number>()
  const valueRef = ref(value)

  function resize(): void {
    if (!textareaRef.value) {
      return
    }

    if (!initialScrollHeight.value) {
      initialScrollHeight.value = textareaRef.value.scrollHeight

      return
    }

    const {lineHeight} = getComputedStyle(textareaRef.value)

    // Get *actual* amount of rows
    const rows = Math.floor(textareaRef.value.scrollHeight / parseFloat(lineHeight))

    if (maxRows && rows > maxRows) {
      return
    }

    if (initialScrollHeight.value <= textareaRef.value.scrollHeight) {
      textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
    }
  }

  watch([textareaRef, valueRef], () => nextTick(resize), {immediate: true})

  useResizeObserver(textareaRef, () => resize())

  if (rest.watch) {
    watch(rest.watch, resize, {immediate: true, deep: true})
  }

  return {value: valueRef, ref: textareaRef}
}
