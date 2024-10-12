import { z } from 'zod'

export const insertRiskStudentsDTO = z.object({
  studentList: z.array(
    z.object({
      studentCode: z.string(),
      scheduleCode: z.string(),
      courseCode: z.string(),
      reasonId: z.number(),
      score: z.number(),
    })
  ),
})

export type InsertRiskStudentsDTO = z.infer<typeof insertRiskStudentsDTO>
