import { boolean, foreignKey, serial, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { thesis } from './thesis'
import { accounts } from './accounts'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const thesisJuries = schema.table(
  'thesis_juries',
  {
    thesisId: serial('thesis_id').notNull(),
    accountId: uuid('account_id').notNull(),
    confirmed: boolean('confirmed').default(true).notNull(),
  },
  (table) => ({
    thesisJuriesFk: foreignKey({
      columns: [table.thesisId],
      foreignColumns: [thesis.id],
      name: 'thesis_juries_fk',
    }).onDelete('cascade'),

    thesisJuriesAccountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'thesis_juries_account_fk',
    }).onDelete('cascade'),
  })
)

export const thesisJuriesSchema = createInsertSchema(thesisJuries)
export type ThesisJuriesSchema = z.infer<typeof thesisJuriesSchema>
