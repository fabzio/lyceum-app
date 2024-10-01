import { char, unique, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'

export const accounts = schema.table(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 60 }).notNull(),
    lastname: varchar('lastname', { length: 60 }).notNull(),
    code: char('code', { length: 8 }).notNull(),
  },
  (table) => {
    return {
      accountUnique: unique('account_unique').on(table.code),
    }
  }
)

export const accountsSchema = createInsertSchema(accounts)
export type AccountsSchema = z.infer<typeof accountsSchema>
