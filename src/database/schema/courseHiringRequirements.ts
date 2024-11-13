import { uuid, text } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { courseHirings } from './courseHirings'
import { courseStep } from './enums'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const courseHiringRequirements = schema.table(
  'course_hiring_requirements',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    courseHiringId: uuid('course_hiring_id')
      .references(() => courseHirings.id)
      .notNull(),
    detail: text('detail').notNull(),
    step: courseStep('step'),
  }
)

export const courseHiringRequirementsRelations = relations(
  courseHiringRequirements,
  ({ one }) => ({
    courseHiring: one(courseHirings, {
      fields: [courseHiringRequirements.courseHiringId],
      references: [courseHirings.id],
    }),
  })
)

export const courseHiringRequirementsSchema = createInsertSchema(
  courseHiringRequirements
)
export type CourseHiringRequirementsSchema = z.infer<
  typeof courseHiringRequirementsSchema
>
