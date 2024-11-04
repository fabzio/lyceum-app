import { uuid, serial, text } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { courses } from './courses'
import { hirings } from './hirings'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const courseHirings = schema.table('course_hirings', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: serial('course_id').references(() => courses.id),
  hiringId: serial('hiring_id').references(() => hirings.id),
  detail: text('detail'),
})

export const courseHiringsRelations = relations(courseHirings, ({ one }) => ({
  course: one(courses, {
    fields: [courseHirings.courseId],
    references: [courses.id],
  }),
  hiring: one(hirings, {
    fields: [courseHirings.hiringId],
    references: [hirings.id],
  }),
}))

export const courseHiringsSchema = createInsertSchema(courseHirings)
export type CourseHiringsSchema = z.infer<typeof courseHiringsSchema>
