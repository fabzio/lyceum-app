import { thesisRequestStatus } from './enums'
import { boolean, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { thesis } from './thesis'
import { foreignKey } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const thesisActions = schema.table(
  'thesis_actions',
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
      foreignColumns: [thesis.id],
      name: 'request_fk',
    }),
  })
)

export const thesisActionsScheme = createInsertSchema(thesisActions)
export type thesisActionsSchema = z.infer<typeof thesisActionsScheme>
