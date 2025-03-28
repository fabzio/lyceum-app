import {
  serial,
  varchar,
  integer,
  uuid,
  foreignKey,
  timestamp,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { accounts } from './accounts' // Asumiendo que tienes una tabla accounts
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schedules } from './schedules'
import { enrollmentModifcationStatus, enrollmentRequestType } from './enums'

export const enrollmentModifications = schema.table(
  'enrollment_modifications',
  {
    id: serial('id').primaryKey(),
    studentId: uuid('student_id').notNull(),
    scheduleId: integer('schedule_id').notNull(),
    requestNumber: integer('request_number').unique(),
    state: enrollmentModifcationStatus('state').default('requested').notNull(),
    requestType: enrollmentRequestType('request_type').notNull(),
    reason: varchar('reason', { length: 255 }).notNull(),
    observation: varchar('observation', { length: 255 }),
    date: timestamp('date').defaultNow().notNull(),
  },
  (table) => ({
    studentFk: foreignKey({
      name: 'enrollments_student_id_fkey',
      columns: [table.studentId],
      foreignColumns: [accounts.id],
    }),

    scheduleFk: foreignKey({
      name: 'enrollments_schedule_id_fkey',
      columns: [table.scheduleId],
      foreignColumns: [schedules.id],
    }),
  })
)

// Relaciones
export const enrollmentsRelations = relations(
  enrollmentModifications,
  ({ one }) => ({
    student: one(accounts, {
      fields: [enrollmentModifications.studentId],
      references: [accounts.id],
    }),
    schedule: one(schedules, {
      fields: [enrollmentModifications.scheduleId],
      references: [schedules.id],
    }),
  })
)

export const enrollmentModificationsSchema = createInsertSchema(
  enrollmentModifications
)
export type EnrollmentModificationsSchema = z.infer<
  typeof enrollmentModificationsSchema
>
