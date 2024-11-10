import { unitsSchema } from '@/database/schema/units'
import { z } from 'zod'

export const insertUnitDTO = z.object({
  name: z.string(),
  description: z.string().optional(),
  details: z.string().optional(),
  parentId: z.number().optional(),
  parentName: z.string().optional(),
  type: unitsSchema.shape.type,
})

export type InsertUnitDTO = z.infer<typeof insertUnitDTO>
