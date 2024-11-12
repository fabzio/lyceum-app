import { serial, text, date, timestamp, integer } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { hiringStatus } from './enums'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { units } from './units'

export const hirings = schema.table('hirings', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id),
  status: hiringStatus('status').default('receiving').notNull(),
  startDate: date('start_date').notNull(),
  endReceivingDate: date('end_receiving_date').notNull(),
  resultsPublicationDate: date('results_publication_date').notNull(),
  endDate: date('end_date').notNull(),
  createdIn: timestamp('created_in').defaultNow(),
})

export const hiringsRelations = relations(hirings, ({ one }) => ({
  unit: one(units, {
    fields: [hirings.unitId],
    references: [units.id],
  }),
}))

export const hiringsSchema = createInsertSchema(hirings)
export type HiringsSchema = z.infer<typeof hiringsSchema>
