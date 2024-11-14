import {
  boolean,
  integer,
  serial,
  timestamp,
  uuid,
  varchar,
  foreignKey,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { presentationLetters } from './presentationLetters'
import { accounts } from './accounts'
import { roles } from './roles'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'

export const presentationLetterActions = schema.table(
  'presentation_letter_actions',
  {
    id: serial('id').primaryKey(),
    presentationLetterId: integer('presentation_letter_id').notNull(),
    actionDate: timestamp('action_date').defaultNow().notNull(),
    takenByAccountId: uuid('taken_by_account_id').notNull(),
    roleId: integer('role_id'),
    content: varchar('content', { length: 1024 }),
    isFile: boolean('is_file').default(false).notNull(),
  },
  (table) => ({
    presentationLetterFk: foreignKey({
      columns: [table.presentationLetterId],
      foreignColumns: [presentationLetters.id],
      name: 'presentation_letter_actions_fk',
    }).onDelete('cascade'),
    accountFk: foreignKey({
      columns: [table.takenByAccountId],
      foreignColumns: [accounts.id],
      name: 'presentation_letter_actions_account_fk',
    }).onDelete('cascade'),
    roleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: 'presentation_letter_actions_role_fk',
    }),
  })
)

export const presentationLetterActionsRelations = relations(
  presentationLetterActions,
  ({ one }) => ({
    presentationLetter: one(presentationLetters, {
      fields: [presentationLetterActions.presentationLetterId],
      references: [presentationLetters.id],
    }),
    account: one(accounts, {
      fields: [presentationLetterActions.takenByAccountId],
      references: [accounts.id],
    }),
    role: one(roles, {
      fields: [presentationLetterActions.roleId],
      references: [roles.id],
    }),
  })
)

export const presentationLetterActionsSchema = createInsertSchema(
  presentationLetterActions
)
export type PresentationLetterActionsSchema = z.infer<
  typeof presentationLetterActionsSchema
>
