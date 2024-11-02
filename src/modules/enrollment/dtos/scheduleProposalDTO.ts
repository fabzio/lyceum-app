import { z } from 'zod'

export const insertCourseToSchPropDTO = z.object({
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

export const updateScheduleProposalStatusDTO = z.object({
  newStatus: z.enum(['requested', 'sended', 'aproved', 'assigned']),
  coursesList: z.array(
    z.object({
      courseId: z.number().min(1),
      vacanciesPerSchema: z.number().max(80).min(1),
      visibleSchedules: z.number().max(10).min(1),
      hiddenSchedules: z.number().max(10).min(1),
    })
  ),
})

export type UpdateScheduleProposalStatusDTO = z.infer<
  typeof updateScheduleProposalStatusDTO
>

export const updateCoursesOfASchPropDTO = z.object({
  coursesList: z.array(
    z.object({
      courseId: z.number().min(1),
      vacanciesPerSchema: z.number().max(80).min(1),
      visibleSchedules: z.number().max(10).min(1),
      hiddenSchedules: z.number().max(10).min(1),
    })
  ),
})

export type UpdateCoursesOfASchPropDTO = z.infer<
  typeof updateCoursesOfASchPropDTO
>
