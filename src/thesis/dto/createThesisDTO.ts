import { z } from 'zod'

export const createThesisDTO = z.object({
  title: z.string(),
  areaId: z.number(),
  applicantCode: z.string(),
  advisors: z.array(z.string()),
  students: z.array(z.string()),
})

export type CreateThesisDTO = z.infer<typeof createThesisDTO>
