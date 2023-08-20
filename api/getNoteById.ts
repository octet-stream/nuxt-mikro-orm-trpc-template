import {isClientError} from "../lib/trpc/error.js"

import type {ONoteOutput} from "../server/trpc/type/note/NoteOutput.js"
import type {ONode} from "../server/trpc/type/common/Node.js"

export const getNoteById = async (input: ONode): Promise<ONoteOutput> => {
  const {$trpc} = useNuxtApp()

  try {
    return await $trpc.note.getById.query(input)
  } catch (error) {
    if (!isClientError(error)) {
      throw error
    }

    throw createError({
      statusCode: error.data?.httpStatus ?? 500,
      message: error.message,
      cause: error.cause,
      data: error.data,
      fatal: true
    })
  }
}
