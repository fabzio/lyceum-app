import { foreignKey, integer, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { accounts, roles, units } from '@/database/schema'
import { schema } from '../pgSchema'

export const accountRoles = schema.table(
  'account_roles',
  {
    accountId: uuid('account_id').notNull(),
    roleId: integer('role_id').notNull(),
    unitId: integer('unit_id').notNull(),
  },
  (table) => {
    return {
      accountRolesRolesFk: foreignKey({
        columns: [table.roleId],
        foreignColumns: [roles.id],
        name: 'account_roles_roles_fk',
      }).onDelete('cascade'),
      accountRolesUnitFk: foreignKey({
        columns: [table.unitId],
        foreignColumns: [units.id],
        name: 'account_roles_unit_fk',
      }).onDelete('cascade'),
      accountRolesAccountFk: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: 'account_roles_account_fk',
      }).onDelete('cascade'),
      accountRolesPk: primaryKey({
        columns: [table.accountId, table.roleId, table.unitId],
        name: 'account_roles_pk',
      }),
    }
  }
)

export const accountRolesRelations = relations(accountRoles, ({ one }) => ({
  roles: one(roles, {
    fields: [accountRoles.roleId],
    references: [roles.id],
  }),
  units: one(units, {
    fields: [accountRoles.unitId],
    references: [units.id],
  }),
}))

export const accountRolesSchema = createInsertSchema(accountRoles)
export type AccountRolesSchema = z.infer<typeof accountRolesSchema>
