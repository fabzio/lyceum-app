import {
  foreignKey,
  integer,
  primaryKey,
  smallint,
  text,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'
import { courses, studyPlans } from '@/database/schema'

export const studyPlanCourses = schema.table(
  'study_plan_courses',
  {
    studyPlanId: integer('study_plan_id').notNull(),
    courseId: integer('course_id').notNull(),
    level: smallint('level').notNull(),
    requirements: text('requirements').array(),
  },
  (table) => {
    return {
      studyPlanCoursesCoursesFk: foreignKey({
        columns: [table.courseId],
        foreignColumns: [courses.id],
        name: 'study_plan_courses_courses_fk',
      }).onDelete('cascade'),
      studyPlanCoursesStudyPlansFk: foreignKey({
        columns: [table.studyPlanId],
        foreignColumns: [studyPlans.id],
        name: 'study_plan_courses_study_plans_fk',
      }).onDelete('cascade'),
      studyPlanCoursesPk: primaryKey({
        columns: [table.studyPlanId, table.courseId],
        name: 'study_plan_courses_pk',
      }),
    }
  }
)

export const studyPlanCoursesRelations = relations(
  studyPlanCourses,
  ({ one }) => ({
    course: one(courses, {
      fields: [studyPlanCourses.courseId],
      references: [courses.id],
    }),
    studyPlan: one(studyPlans, {
      fields: [studyPlanCourses.studyPlanId],
      references: [studyPlans.id],
    }),
  })
)

export const studyPlanCoursesSchema = createInsertSchema(studyPlanCourses)
export type StudyPlanCoursesSchema = z.infer<typeof studyPlanCoursesSchema>
