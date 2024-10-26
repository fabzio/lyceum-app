import { AccountsSchema } from '@/database/schema/accounts'

import { z } from 'zod'

export const createAdministrativesDTO = z.object({
    administrativeList: z.array(
      z.object({
        name: z.string().max(60),          
        firstSurname: z.string().max(60),   
        secondSurname: z.string().max(60),  
        code: z.string().length(8),            
        email: z.string().email().max(60), 
      })
    )
})

export type CreateAdministrativeDTO = z.infer<typeof createAdministrativesDTO>


