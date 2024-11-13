import { uuid, serial, text, integer } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { courses } from './courses'
import { hirings } from './hirings'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { courseHiringRequirements } from './courseHiringRequirements'

export const courseHirings = schema.table('course_hirings', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: integer('course_id').references(() => courses.id),
  hiringId: integer('hiring_id').references(() => hirings.id),
  detail: text('detail'),
})

export const courseHiringsRelations = relations(
  courseHirings,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [courseHirings.courseId],
      references: [courses.id],
    }),
    hiring: one(hirings, {
      fields: [courseHirings.hiringId],
      references: [hirings.id],
    }),

    requirements: many(courseHiringRequirements),
  })
)

export const courseHiringsSchema = createInsertSchema(courseHirings)
export type CourseHiringsSchema = z.infer<typeof courseHiringsSchema>
