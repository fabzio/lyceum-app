import { serial, varchar, integer, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts } from './accounts' // Asumiendo que tienes una tabla accounts
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schedules } from './schedules'

// Definición de la tabla "enrollments"
export const enrollments = schema.table('enrollments', {
  id: serial('id').primaryKey(),
  studentId: uuid('student_id').references(() => accounts.id), // clave foránea a accounts
  scheduleId: serial('schedule_id').references(() => schedules.id),  // clave foránea a courses
  request_number: integer('request_number').notNull(),
  state: varchar('state', { length: 50 }),
  request_type: varchar('request_type', { length: 50 }),
  reason: varchar('reason', { length: 255 }),
})

// Relaciones
export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(accounts, {
    fields: [enrollments.studentId],
    references: [accounts.id],
  }),
  schedule: one(schedules, {
    fields: [enrollments.scheduleId],
    references: [schedules.id],
  }),
}))

// Esquema de validación con Zod
export const enrollmentsSchema = createInsertSchema(enrollments)
export type EnrollmentsSchema = z.infer<typeof enrollmentsSchema>
