/* eslint-disable import/no-duplicates */

import type {input, output} from "zod"
import {z} from "zod"

import {isString} from "lodash-es"
import {parseISO, toDate} from "date-fns"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform<Date>(date => isString(date) ? parseISO(date) : toDate(date))

export type IDateTime = input<typeof DateTime>

export type ODateTime = output<typeof DateTime>
