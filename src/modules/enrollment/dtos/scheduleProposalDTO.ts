import { z } from 'zod'

export const insertCourseToSchPropDTO = z.object({
  enrollmentProposalId: z.number().min(1),
  coursesList: z.array(
    z.object({
      courseId: z.number().min(1),
      vacanciesPerSchema: z.number().max(80).min(1),
      visibleSchedules: z.number().max(10).min(1),
      hiddenSchedules: z.number().max(10).min(1),
    })
  ),
})

export type InsertCourseToSchPropDTO = z.infer<typeof insertCourseToSchPropDTO>
