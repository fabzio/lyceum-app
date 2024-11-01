import { z } from 'zod'

export const accountRoleSchema = z.object({
  accountId: z.string().uuid(),
  roleId: z.number(),
  unitId: z.number(),
})
