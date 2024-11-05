import db from '@/database'
import { units, UnitsInsertSchema } from '@/database/schema/units'
import { eq } from 'drizzle-orm'

class UnitService {
  public async getUnitsByType(type: UnitsInsertSchema['type']) {
    return await db
      .select({
        unitId: units.id,
        name: units.name,
      })
      .from(units)
      .where(eq(units.type, type))
  }
}

export default UnitService
