import { z } from 'zod'

export const createProfessorsDTO = z.object({
  professorList: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      first_surname: z.string(),
      second_surname: z.string(),
      email: z.string(),
    })
  ),
})
