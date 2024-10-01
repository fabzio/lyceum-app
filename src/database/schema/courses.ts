import { char, numeric, serial, unique, varchar } from 'drizzle-orm/pg-core'
import { studyPlanCourses } from '@/database/schema'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'

export const courses = schema.table(
  'courses',
  {
    id: serial('id').primaryKey(),
    code: char('code', { length: 8 }).notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    credits: numeric('credits', { precision: 3, scale: 2 }).notNull(),
  },
  (table) => {
    return {
      courseUnique: unique('course_unique').on(table.code),
    }
  }
)

export const coursesRelations = relations(courses, ({ many }) => ({
  studyPlanCoursess: many(studyPlanCourses),
}))

export const coursesSchema = createInsertSchema(courses)
export type CoursesSchema = z.infer<typeof coursesSchema>
