import {
  foreignKey,
  serial,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { schema } from '../pgSchema'
import { accounts } from './accounts'

export const audits = schema.table(
  'audits',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull(),
    action: varchar('action', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [accounts.id],
      name: 'audit_user_fk',
    }),
  })
)
