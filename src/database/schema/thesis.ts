import {
  boolean,
  char,
  foreignKey,
  index,
  integer,
  serial,
  smallint,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { accounts } from './accounts'
import { units } from './units'
import { thesisJuryStatus } from './enums'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const thesis = schema.table(
  'thesis',
  {
    id: serial('id').primaryKey(),
    requestCode: char('request_code', { length: 10 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    areaId: integer('area_id').notNull(),
    applicantId: uuid('applicant_id').notNull(),
    date: timestamp('date').defaultNow().notNull(),
    lastActionId: integer('last_action_id'),
    aprovationPhase: smallint('aprovation_phase').default(1).notNull(),
    aproved: boolean('aproved').default(false).notNull(),
    juryState: thesisJuryStatus('jury_state').default('unassigned').notNull(),
  },
  (table) => ({
    requestCodeUnique: uniqueIndex('request_code_unique').on(table.requestCode),
    studentCodeIndex: index('student_code_index').on(table.applicantId),
    requestApplicantFk: foreignKey({
      columns: [table.applicantId],
      foreignColumns: [accounts.id],
      name: 'request_applicant_fk',
    }).onDelete('cascade'),
    requestAreaFk: foreignKey({
      columns: [table.areaId],
      foreignColumns: [units.id],
      name: 'request_area_fk',
    }),
  })
)

const thesisSchema = createInsertSchema(thesis)
export type ThesisSchema = z.infer<typeof thesisSchema>
