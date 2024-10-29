import { z } from 'zod'

export const insertCourseToSchPropDTO = z.object({
  enrollmentProposalId: z.number(),
  coursesList: z.array(
    z.object({
      courseId: z.number(),
      vacanciesPerSchema: z.number().max(80),
      visibleSchedules: z.number().max(10),
      hiddenSchedules: z.number().max(10),
    })
  ),
})

export type InsertCourseToSchPropDTO = z.infer<typeof insertCourseToSchPropDTO>
