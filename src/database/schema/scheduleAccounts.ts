import { boolean, foreignKey, serial, uuid } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { schedules } from './schedules'
import { accounts } from './accounts'
import { roles } from './roles'
import { relations } from 'drizzle-orm'

export const scheduleAccounts = schema.table(
  'schedule_accounts',
  {
    scheduleId: serial('schedule_id').notNull(),
    accountId: uuid('account_id').notNull(),
    roleId: serial('role_id').notNull(),
    lead: boolean('lead').default(false),
  },
  (table) => ({
    scheduleAccountsScheduleFk: foreignKey({
      columns: [table.scheduleId],
      foreignColumns: [schedules.id],
      name: 'schedule_accounts_schedule_fk',
    }).onDelete('cascade'),

    scheduleAccountsAccountFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [accounts.id],
      name: 'schedule_accounts_account_fk',
    }).onDelete('cascade'),

    scheduleAccountsRoleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
      name: 'schedule_accounts_role_fk',
    }).onDelete('cascade'),
  })
)

export const scheduleAccountsRelations = relations(
  scheduleAccounts,
  ({ one }) => ({
    schedule: one(schedules, {
      fields: [scheduleAccounts.scheduleId],
      references: [schedules.id],
    }),
    account: one(accounts, {
      fields: [scheduleAccounts.accountId],
      references: [accounts.id],
    }),
    role: one(roles, {
      fields: [scheduleAccounts.roleId],
      references: [roles.id],
    }),
  })
)
