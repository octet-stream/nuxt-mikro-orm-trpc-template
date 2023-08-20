import {TRPCClientError} from "@trpc/client"

import {Router} from "../../server/trpc/router.js"

export type ClientError = TRPCClientError<Router>

export const isClientError = (
  value: unknown
): value is ClientError => value instanceof TRPCClientError
