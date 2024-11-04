import { serial, text, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts } from './accounts'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { jobRequestState } from './enums'
import { z } from 'zod'

export const jobRequests = schema.table('job_requests', {
  id: serial('id').primaryKey(),
  accountId: uuid('account_id').references(() => accounts.id),
  requirementUrl: text('requirement_url'),
  motivation: text('motivation'),
  state: jobRequestState('state').default('sent').notNull(),
  observation: text('observation'),
})

export const jobRequestsRelations = relations(jobRequests, ({ one }) => ({
  account: one(accounts, {
    fields: [jobRequests.accountId],
    references: [accounts.id],
  }),
}))

export const jobRequestsSchema = createInsertSchema(jobRequests)
export type JobRequestsSchema = z.infer<typeof jobRequestsSchema>
