import { foreignKey, integer, serial } from 'drizzle-orm/pg-core'
import { schema } from '..'
import { units } from './units'

export const unitsSupports = schema.table(
  'units_supports',
  {
    id: serial('id').primaryKey(),
    supportingUnitId: integer('supporting_unit_id').notNull(),
    supportedUnitId: integer('supported_unit_id').notNull(),
  },
  (table) => ({
    unitsSupportsUnitFk: foreignKey({
      columns: [table.supportedUnitId],
      foreignColumns: [units.id],
      name: 'units_supports_unit_fk',
    }),
    unitsSupportsSupportFk: foreignKey({
      columns: [table.supportingUnitId],
      foreignColumns: [units.id],
      name: 'units_supports_support_fk',
    }),
  })
)
