import { serial, unique, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'

export const riskReasons = schema.table(
  'risk_reasons',
  {
    id: serial('id').primaryKey(),
    description: varchar('description', { length: 100 }).notNull(),
  },
  (table) => ({
    riskReasonUnique: unique('risk_reasons_unique').on(table.description),
  })
)
