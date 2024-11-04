import {
  serial,
  text,
  date,
  timestamp,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts } from './accounts'
import { hiringStatus } from './enums'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const hirings = schema.table('hirings', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  accountId: uuid('account_id').references(() => accounts.id),
  status: hiringStatus('status').default('receiving').notNull(),
  startDate: date('start_date'),
  endReceivingDate: date('end_receiving_date'),
  resultsPublicationDate: date('results_publication_date'),
  endDate: date('end_date'),
  createdIn: timestamp('created_in').defaultNow(),
})

export const hiringsRelations = relations(hirings, ({ one }) => ({
  account: one(accounts, {
    fields: [hirings.accountId],
    references: [accounts.id],
  }),
}))

export const hiringsSchema = createInsertSchema(hirings)
export type HiringsSchema = z.infer<typeof hiringsSchema>
