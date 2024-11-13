import { z } from 'zod'

export const assignJPDTO = z.object({
  scheduleId: z.number().int().positive(),
  accountId: z.string().uuid(),
})
