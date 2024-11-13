import { foreignKey, integer, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { schema } from '../pgSchema'
import { accountRoles, specialityStudyPlans, unitType } from '@/database/schema'

export const units = schema.table(
  'units',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: varchar('description', { length: 500 }),
    details: varchar('details', { length: 1000 }),
    parentId: integer('parent_id'),
    type: unitType('type').notNull(),
  },
  (table) => {
    return {
      unitUnitFk: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: 'unit_unit_fk',
      }).onDelete('set null'),
    }
  }
)

export const unitsRelations = relations(units, ({ one, many }) => ({
  unit: one(units, {
    fields: [units.parentId],
    references: [units.id],
    relationName: 'units_parentId_units_id',
  }),
  units: many(units, {
    relationName: 'units_parentId_units_id',
  }),
  specialityStudyPlans: many(specialityStudyPlans),
  accountRoles: many(accountRoles),
}))

export const unitsSchema = createInsertSchema(units)
export type UnitsInsertSchema = z.infer<typeof unitsSchema>
