import { z } from 'zod'

export const insertProfesorToSchDTO = z.object({
  scheduleId: z.number().min(1),
  professorsList: z.array(
    z.object({
      professorId: z.string().min(1),
      islead: z.boolean(),
    })
  ),
})

export type insertProfesorToSchPropDTO = z.infer<typeof insertProfesorToSchDTO>
