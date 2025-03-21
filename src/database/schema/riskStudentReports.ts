import {
  foreignKey,
  integer,
  serial,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { riskStudents } from './riskStudents'
import { relations } from 'drizzle-orm'

export const riskStudentReports = schema.table(
  'risk_student_reports',
  {
    id: serial('id').primaryKey(),
    score: smallint('score').notNull(),
    date: timestamp('date').notNull().defaultNow(),
    observation: varchar('observation', { length: 512 }),
    studentId: uuid('student_id').notNull(),
    scheduleId: integer('schedule_id').notNull(),
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
