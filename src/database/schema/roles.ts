import { boolean, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { unitType } from './enums'
import { schema } from '../pgSchema'
import { rolePermissions } from './rolePermissions'
import { accountRoles } from '.'

export const roles = schema.table('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 80 }).notNull(),
  unitType: unitType('unit_type').notNull(),
  editable: boolean('editable').default(true),
})

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  accountRoles: many(accountRoles),
}))

export const rolesSchema = createInsertSchema(roles)
export type RolesSchema = z.infer<typeof rolesSchema>
