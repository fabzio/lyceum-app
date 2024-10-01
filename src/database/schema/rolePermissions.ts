import { foreignKey, integer, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'
import { permissions, roles } from '@/database/schema'

export const rolePermissions = schema.table(
  'role_permissions',
  {
    roleId: integer('role_id').notNull(),
    permissionId: integer('permission_id').notNull(),
  },
  (table) => {
    return {
      rolePermissionsPermissionsFk: foreignKey({
        columns: [table.permissionId],
        foreignColumns: [permissions.id],
        name: 'role_permissions_permissions_fk',
      }).onDelete('cascade'),
      rolePermissionsRolesFk: foreignKey({
        columns: [table.roleId],
        foreignColumns: [roles.id],
        name: 'role_permissions_roles_fk',
      }).onDelete('cascade'),
      rolePermissionsPk: primaryKey({
        columns: [table.roleId, table.permissionId],
        name: 'role_permissions_pk',
      }),
    }
  }
)

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
  })
)

export const rolePermissionsSchema = createInsertSchema(rolePermissions)
export type RolePermissionsSchema = z.infer<typeof rolePermissionsSchema>
