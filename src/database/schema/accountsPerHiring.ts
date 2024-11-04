import { uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts } from './accounts'
import { courseHirings } from './courseHirings'
import { hiringType } from './enums'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const accountsPerHiring = schema.table('accounts_per_hiring', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => accounts.id),
  courseHiringId: uuid('course_hiring_id').references(() => courseHirings.id),
  hiringType: hiringType('hiring_type'),
})

export const accountsPerHiringRelations = relations(
  accountsPerHiring,
  ({ one }) => ({
    account: one(accounts, {
      fields: [accountsPerHiring.accountId],
      references: [accounts.id],
    }),
    courseHiring: one(courseHirings, {
      fields: [accountsPerHiring.courseHiringId],
      references: [courseHirings.id],
    }),
  })
)

export const accountsPerHiringSchema = createInsertSchema(accountsPerHiring)
export type AccountsPerHiringSchema = z.infer<typeof accountsPerHiringSchema>
