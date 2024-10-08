import {
  date,
  foreignKey,
  serial,
  smallint,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '..'
import { riskStudents } from './riskStudents'
import { relations } from 'drizzle-orm'

export const riskStudentReports = schema.table(
  'risk_student_reports',
  {
    id: serial('id').primaryKey(),
    score: smallint('score').notNull(),
    date: date('date').notNull().default('now()'),
    observation: varchar('observation', { length: 512 }),
    studentId: uuid('student_id').notNull(),
    scheduleId: serial('schedule_id').notNull(),
  },
  (table) => ({
    riskStudentReportsRiskStudentsFk: foreignKey({
      columns: [table.studentId, table.scheduleId],
      foreignColumns: [riskStudents.studentId, riskStudents.scheduleId],
    }),
  })
)

export const riskStudentReportsRelations = relations(
  riskStudentReports,
  ({ one }) => ({
    riskStudents: one(riskStudents, {
      fields: [riskStudentReports.studentId, riskStudentReports.scheduleId],
      references: [riskStudents.studentId, riskStudents.scheduleId],
    }),
  })
)

