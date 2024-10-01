import { foreignKey, integer, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'
import { modules, rolePermissions } from '@/database/schema'

export const permissions = schema.table(
  'permissions',
  {
    id: serial('id').primaryKey(),
    description: varchar('description').notNull(),
    moduleId: integer('module_id').notNull(),
  },
  (table) => {
    return {
      permissionsModuleFk: foreignKey({
        columns: [table.id],
        foreignColumns: [modules.id],
        name: 'permissions_module_fk',
      }),
    }
  }
)

export const permissionsRelations = relations(permissions, ({ one, many }) => ({
  module: one(modules, {
    fields: [permissions.id],
    references: [modules.id],
  }),
  rolePermissions: many(rolePermissions),
}))

export const permissionsSchema = createInsertSchema(permissions)
export type PermissionsSchema = z.infer<typeof permissionsSchema>
