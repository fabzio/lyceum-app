import { boolean, foreignKey, serial, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { roles } from './roles'
import { accounts } from './accounts'
import { thesisThemeRequests } from './thesisThemeRequests'

export const thesisThemeAccounts = schema.table(
  'thesis_theme_accounts',
  {
    thesisThemeRequestId: serial('thesis_theme_request_id').notNull(),
    accountId: uuid('account_id').notNull(),
    roleId: serial('role_id').notNull(),
    lead: boolean('lead').notNull().default(false),
  },
  (table) => ({
    thesisThemeAccountsFk: foreignKey({
      columns: [table.thesisThemeRequestId],
      foreignColumns: [thesisThemeRequests.id],
      name: 'thesis_theme_accounts_fk',
    }),

    thesisThemeAccountsAccountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'thesis_theme_accounts_account_fk',
    }),

    thesisThemeAccountsRoleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: 'thesis_theme_accounts_role_fk',
    }),
  })
)
