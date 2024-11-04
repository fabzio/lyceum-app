import { serial, varchar, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { accounts } from './accounts'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { identityType } from './enums'
import { z } from 'zod'

export const contactsInfo = schema.table('contacts_info', {
  id: serial('id').primaryKey(),
  accountId: uuid('account_id').references(() => accounts.id),
  phone: varchar('phone', { length: 15 }),
  secondaryPhone: varchar('secondary_phone', { length: 15 }),
  identityType: identityType('identity_type'),
  CUI: varchar('CUI', { length: 20 }),
})

export const contactsInfoRelations = relations(contactsInfo, ({ one }) => ({
  account: one(accounts, {
    fields: [contactsInfo.accountId],
    references: [accounts.id],
  }),
}))

export const contactsInfoSchema = createInsertSchema(contactsInfo)
export type ContactsInfoSchema = z.infer<typeof contactsInfoSchema>
