import {
  char,
  foreignKey,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts, roles, units } from '.'

export const thesisThemeRequests = schema.table(
  'thesis_theme_request',
  {
    id: serial('id').primaryKey(),
    requestCode: char('request_code', { length: 10 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    areaId: serial('area_id').notNull(),
    applicantId: uuid('applicant_id').notNull(),
    date: timestamp('date').defaultNow().notNull(),
    lastActionId: serial('last_action_id').notNull(),
  },
  (table) => ({
    requestCodeUnique: uniqueIndex('request_code_unique').on(table.requestCode),
    requestApplicantFk: foreignKey({
      columns: [table.applicantId],
      foreignColumns: [accounts.id],
      name: 'request_applicant_fk',
    }),
    requestAreaFk: foreignKey({
      columns: [table.areaId],
      foreignColumns: [units.id],
      name: 'request_area_fk',
    }),
    requestLastRoleFk: foreignKey({
      columns: [table.lastActionId],
      foreignColumns: [roles.id],
      name: 'request_last_role_fk',
    }),
  })
)
