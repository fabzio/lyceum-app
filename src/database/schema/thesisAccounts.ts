import { boolean, foreignKey, serial, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { roles } from './roles'
import { accounts } from './accounts'
import { thesis } from './thesis'

export const thesisAccounts = schema.table(
  'thesis_accounts',
  {
    thesisThemeRequestId: serial('thesis_request_id').notNull(),
    accountId: uuid('account_id').notNull(),
    roleId: serial('role_id').notNull(),
    lead: boolean('lead').notNull().default(false),
  },
  (table) => ({
    thesisAccountsFk: foreignKey({
      columns: [table.thesisThemeRequestId],
      foreignColumns: [thesis.id],
      name: 'thesis_accounts_fk',
    }),

    thesisAccountsAccountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'thesis_accounts_account_fk',
    }),

    thesisAccountsRoleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: 'thesis_accounts_role_fk',
    }),
  })
)
