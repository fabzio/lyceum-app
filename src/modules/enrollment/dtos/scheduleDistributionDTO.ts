import { z } from 'zod'

export const insertProfesorToSchDTO = z.object({
  professorsList: z.array(
    z.object({
      professorId: z.string().min(1),
      isLead: z.boolean(),
    })
  ),
})

export type insertProfesorToSchPropDTO = z.infer<typeof insertProfesorToSchDTO>
