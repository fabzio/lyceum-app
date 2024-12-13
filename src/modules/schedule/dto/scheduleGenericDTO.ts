import { z } from 'zod'

export const assignJPDTO = z.object({
  scheduleId: z.number().int().positive(),
  accountId: z.string().uuid(),
})

export const insertStudentsInCourseDTO = z.object({
  courseCode: z.string(), // Código del curso
  students: z.array(
    z.object({
      studentCode: z.string(), // Código del estudiante
      scheduleCode: z.string(), // Código del horario
    })
  ), // Lista de estudiantes con sus códigos de horario
})
