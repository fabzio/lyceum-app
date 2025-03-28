import {
  char,
  foreignKey,
  integer,
  serial,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '../pgSchema'
import { accountStatus } from './enums'
import { relations } from 'drizzle-orm'
import { scheduleAccounts } from './scheduleAccounts'
import { riskStudents } from './riskStudents'
import { contactsInfo } from './contactsInfo'
import { accountRoles, presentationLetterAccounts, units } from '.'

export const accounts = schema.table(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 60 }).notNull(),
    firstSurname: varchar('first_surname', { length: 60 }).notNull(),
    secondSurname: varchar('second_surname', { length: 60 }).notNull(),
    code: char('code', { length: 8 }).notNull(),
    googleId: varchar('google_id', { length: 60 }),
    email: varchar('email', { length: 60 }).notNull(),
    password: varchar('password', { length: 200 }),
    state: accountStatus('state').notNull().default('active'),
    unitId: integer('unit_id').notNull(),
  },
  (table) => {
    return {
      unitFk: foreignKey({
        name: 'accounts_unit_id_fkey',
        columns: [table.unitId],
        foreignColumns: [units.id],
      }),
      accountCodeUnique: uniqueIndex('account_code_unique').on(table.code),
      accountEmailUnique: unique('account_email_unique').on(table.email),
      accountGoogleIdUnique: unique('account_google_id_unique').on(
        table.googleId
      ),
    }
  }
)

export const accountsRelations = relations(accounts, ({ many }) => ({
  scheduleAccounts: many(scheduleAccounts),
  accountRoles: many(accountRoles),
  riskStudents: many(riskStudents),
  contactsInfo: many(contactsInfo),
  presentationLetters: many(presentationLetterAccounts),
}))

export const accountsSchema = createInsertSchema(accounts)
export type AccountsSchema = z.infer<typeof accountsSchema>
