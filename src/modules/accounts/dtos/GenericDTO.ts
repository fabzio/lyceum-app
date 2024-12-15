import { AccountsSchema } from '@/database/schema/accounts'

import { z } from 'zod'

export const createAGenericDTO = z.object({
  name: z.string().max(60).optional(),
  firstSurname: z.string().max(60).optional(),
  secondSurname: z.string().max(60).optional(),
  email: z.string().email().max(80),
})

export type CreateAGenericDTO = z.infer<typeof createAGenericDTO>
