import {
  char,
  integer,
  serial,
  timestamp,
  varchar,
  text,
  foreignKey,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { schedules } from './schedules'
import { units } from './units'
import { presentationLetterStatus } from './enums'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'
import { presentationLetterActions } from './presentationLetterActions'
import { presentationLetterAccounts } from './presentationLetterAccounts'

export const presentationLetters = schema.table(
  'presentation_letters',
  {
    id: serial('id').primaryKey(),
    scheduleId: integer('schedule_id').notNull(),
    unitId: integer('unit_id'),
    status: presentationLetterStatus('status').notNull().default('sent'),
    requestCode: char('request_code', { length: 10 }),
    companyName: varchar('company_name', { length: 255 }).notNull(),
    detail: text('detail'),
    submissionDate: timestamp('submission_date'),
    acceptanceDate: timestamp('acceptance_date'),
    completionDate: timestamp('completion_date'),
    lastActionId: integer('last_action_id'),
  },
  (table) => ({
    scheduleFk: foreignKey({
      columns: [table.scheduleId],
      foreignColumns: [schedules.id],
      name: 'presentation_letters_schedule_fk',
    }).onDelete('cascade'),
    unitFk: foreignKey({
      columns: [table.unitId],
      foreignColumns: [units.id],
      name: 'presentation_letters_unit_fk',
    }),
  })
)

export const presentationLettersRelations = relations(
  presentationLetters,
  ({ one, many }) => ({
    schedule: one(schedules, {
      fields: [presentationLetters.scheduleId],
      references: [schedules.id],
    }),
    unit: one(units, {
      fields: [presentationLetters.unitId],
      references: [units.id],
    }),
    actions: many(presentationLetterActions), // Relación de uno a muchos con `presentationLetterActions`
    accounts: many(presentationLetterAccounts), // Relación de muchos a muchos con `presentationLetterAccounts`
  })
)

export const presentationLettersSchema = createInsertSchema(presentationLetters)
export type PresentationLettersSchema = z.infer<
  typeof presentationLettersSchema
>
