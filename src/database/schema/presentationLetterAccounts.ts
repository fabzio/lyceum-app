import { boolean, integer, serial, uuid, foreignKey } from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { presentationLetters } from './presentationLetters'
import { accounts } from './accounts'
import { roles } from './roles'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'

export const presentationLetterAccounts = schema.table(
  'presentation_letter_accounts',
  {
    presentationLetterId: integer('presentation_letter_id').notNull(),
    accountId: uuid('account_id').notNull(),
    roleId: integer('role_id').notNull(),
    lead: boolean('lead').notNull().default(false),
  },
  (table) => ({
    presentationLetterFk: foreignKey({
      columns: [table.presentationLetterId],
      foreignColumns: [presentationLetters.id],
      name: 'presentation_letter_accounts_fk',
    }).onDelete('cascade'),
    accountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'presentation_letter_accounts_account_fk',
    }).onDelete('cascade'),
    roleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: 'presentation_letter_accounts_role_fk',
    }).onDelete('cascade'),
  })
)

export const presentationLetterAccountsRelations = relations(
  presentationLetterAccounts,
  ({ one }) => ({
    presentationLetter: one(presentationLetters, {
      fields: [presentationLetterAccounts.presentationLetterId],
      references: [presentationLetters.id],
    }),
    account: one(accounts, {
      fields: [presentationLetterAccounts.accountId],
      references: [accounts.id],
    }),
    role: one(roles, {
      fields: [presentationLetterAccounts.roleId],
      references: [roles.id],
    }),
  })
)

export const presentationLetterAccountsSchema = createInsertSchema(
  presentationLetterAccounts
)
export type PresentationLetterAccountsSchema = z.infer<
  typeof presentationLetterAccountsSchema
>
