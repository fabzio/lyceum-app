import { z } from 'zod'

export const createStudentsDTO = z.object({
  studentList: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      firstSurname: z.string(),
      secondSurname: z.string(),
      email: z.string().email(),
      speciality: z.string(),
    })
  ),
})
