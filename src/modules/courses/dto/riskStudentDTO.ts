import { z } from 'zod'

export const insertRiskStudentsDTO = z.object({
  studentList: z.array(
    z.object({
      studentCode: z.string(),
      scheduleCode: z.string(),
      courseCode: z.string(),
      reasonId: z.number(),
    })
  ),
})

export type InsertRiskStudentsDTO = z.infer<typeof insertRiskStudentsDTO>

export const insertOneRiskStudentsDTO = z.object({
  studentId: z.string(),
  scheduleId: z.number(),
  courseId: z.number(),
  reasonId: z.number(),
})

export type InsertOneRiskStudentsDTO = z.infer<typeof insertOneRiskStudentsDTO>
