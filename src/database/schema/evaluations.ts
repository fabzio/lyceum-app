import { serial, decimal, date, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { jobRequests } from './jobRequests'
import { accounts } from './accounts'
import { courseHiringRequirements } from './courseHiringRequirements'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const evaluations = schema.table('evaluations', {
  id: serial('id').primaryKey(),
  jobRequestId: serial('job_request_id').references(() => jobRequests.id),
  accountId: uuid('account_id').references(() => accounts.id),
  requirementPerCourseId: uuid('requirement_per_course_id').references(
    () => courseHiringRequirements.id
  ),
  score: decimal('score'),
  evaluationDate: date('evaluation_date'),
})

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  jobRequest: one(jobRequests, {
    fields: [evaluations.jobRequestId],
    references: [jobRequests.id],
  }),
  account: one(accounts, {
    fields: [evaluations.accountId],
    references: [accounts.id],
  }),
  requirement: one(courseHiringRequirements, {
    fields: [evaluations.requirementPerCourseId],
    references: [courseHiringRequirements.id],
  }),
}))

export const evaluationsSchema = createInsertSchema(evaluations)
export type EvaluationsSchema = z.infer<typeof evaluationsSchema>
