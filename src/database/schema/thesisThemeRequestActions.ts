import { thesisRequestStatus } from './enums'
import { boolean, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { thesisThemeRequests } from './thesisThemeRequests'
import { foreignKey } from 'drizzle-orm/pg-core'

export const thesisThemeRequestActions = schema.table(
  'thesis_theme_request_actions',
  {
    id: serial('id').primaryKey(),
    requestId: serial('request_id').notNull(),
    content: varchar('content', { length: 1024 }).notNull(),
    isFile: boolean('is_file').default(false).notNull(),
    action: thesisRequestStatus('action').notNull(),
    accountId: uuid('account_id').notNull(),
    roleId: serial('role_id').notNull(),
    date: timestamp('date').defaultNow().notNull(),
  },
  (table) => ({
    requestFk: foreignKey({
      columns: [table.requestId],
      foreignColumns: [thesisThemeRequests.id],
      name: 'request_fk',
    }),
  })
)
