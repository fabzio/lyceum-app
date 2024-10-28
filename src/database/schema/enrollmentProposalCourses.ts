import { foreignKey, integer, serial, smallint } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { enrollmentProposal } from './enrollmentProposal'
import { courses } from './courses'

export const enrollmentProposalCourses = schema.table(
  'enrollment_proposal_courses',
  {
    id: serial('id').primaryKey(),
    enrollmentProposalId: integer('enrollment_proposal_id').notNull(),
    courseId: integer('course_id').notNull(),
    vacanciesPerSchema: smallint('vacancies_per_schema').notNull(),
    visibleSchedules: smallint('visible_schedules').notNull(),
    hiddenSchedules: smallint('hidden_schedules').notNull(),
  },
  (table) => ({
    enrollmentProposalFk: foreignKey({
      columns: [table.enrollmentProposalId],
      foreignColumns: [enrollmentProposal.id],
      name: 'enrollment_proposal_courses_fk',
    }),
    enrollmentProposalCoursesFk: foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: 'enrollment_proposal_courses_fk',
    }),
  })
)
