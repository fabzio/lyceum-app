import { z } from 'zod'

export const insertRiskStudentReportDTO = z.object({
  studentCode: z.string(),
  scheduleId: z.number(),
  score: z.number().gte(1).lte(5),
  observation: z.string(),
})

export type InsertRiskStudentReportDTO = z.infer<
  typeof insertRiskStudentReportDTO
>
