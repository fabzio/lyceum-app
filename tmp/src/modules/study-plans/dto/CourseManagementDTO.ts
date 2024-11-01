import { z } from "zod";

export const createCoursesDTO = z.object({
  courseList: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      credits: z.number(),
    })
  )
})