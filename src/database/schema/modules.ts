import { serial, unique, varchar } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '..'
import { permissions } from '@/database/schema'

export const modules = schema.table(
  'modules',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 60 }),
  },
  (table) => {
    return {
      moduleUnique: unique('modules_unique').on(table.name),
    }
  }
)

export const modulesRelations = relations(modules, ({ many }) => ({
  permissions: many(permissions),
}))

export const modulesSchema = createInsertSchema(modules)
export type ModulesSchema = z.infer<typeof modulesSchema>
