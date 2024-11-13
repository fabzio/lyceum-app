import {
  boolean,
  foreignKey,
  integer,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { courses } from './courses'
import { terms } from './terms'
import { relations } from 'drizzle-orm'
import { scheduleStatus } from './enums'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const schedules = schema.table(
  'schedules',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 8 }).notNull(),
    courseId: integer('course_id').notNull(),
    termId: integer('term_id').notNull(),
    state: scheduleStatus('state').notNull().default('editing'),
    vacancies: smallint('vacancies').notNull(),
    visibility: boolean('visibility').notNull(),
  },
  (table) => ({
    scheduleCourseFk: foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: 'schedule_course_fk',
    }).onDelete('cascade'),

    scheduleTermFk: foreignKey({
      columns: [table.termId],
      foreignColumns: [terms.id],
      name: 'schedule_term_fk',
    }).onDelete('cascade'),
  })
)

export const scheduleRelations = relations(schedules, ({ one }) => ({
  course: one(courses, {
    fields: [schedules.courseId],
    references: [courses.id],
  }),
  term: one(terms, {
    fields: [schedules.termId],
    references: [terms.id],
  }),
}))

export const scheuleSchema = createInsertSchema(schedules)
export type ScheduleSchema = z.infer<typeof scheuleSchema>
