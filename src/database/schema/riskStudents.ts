import {
  foreignKey,
  smallint,
  primaryKey,
  serial,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core'
import { schema } from '..'
import { schedules } from './schedules'
import { riskReasons } from './riskReasons'
import { accounts } from './accounts'

export const riskStudents = schema.table(
  'risk_students',
  {
    studentId: uuid('student_id'),
    scheduleId: serial('schedule_id'),
    reasonId: serial('reason_id').notNull(),
    score: smallint('score').notNull(),
    state: boolean('state').notNull().default(true),
  },
  (table) => ({
    riskStudentsPk: primaryKey({
      columns: [table.studentId, table.scheduleId],
      name: 'risk_students_pk',
    }),
    riskStudentsStudentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [accounts.id],
      name: 'risk_students_student_fk',
    }).onDelete('cascade'),

    riskStudentsReasonFk: foreignKey({
      columns: [table.reasonId],
      foreignColumns: [riskReasons.id],
      name: 'risk_students_reason_fk',
    }).onDelete('cascade'),

    riskStudentsCourseFk: foreignKey({
      columns: [table.scheduleId],
      foreignColumns: [schedules.id],
      name: 'risk_students_course_fk',
    }).onDelete('cascade'),
  })
)
