import { z } from 'zod'

export const createHiringSelectionDTO = z.object({
  unitId: z.number(),
  description: z.string().min(1),
  startDate: z.date(),
  endReceivingDate: z.date(),
  resultsPublicationDate: z.date(),
  endDate: z.date(),
  courses: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        code: z.string(),
        requirements: z
          .array(
            z.object({
              detail: z.string().min(1),
            })
          )
          .nonempty(),
      })
    )
    .nonempty(),
})

export type CreateHiringSelectionPropDTO = z.infer<
  typeof createHiringSelectionDTO
>

export const updateHiringSelectionStatusDTO = z.object({
  accountId: z.string().min(1),
  newStatus: z.enum([
    'sent',
    'rejected',
    'to_evaluate',
    'evaluated',
    'selected',
  ]),

  evaluationList: z
    .array(
      z.object({
        evaluationId: z.string().min(1),
        courseHiringRequirementId: z.string().min(1),
        score: z.number().min(0),
      })
    )
    .optional(),
})

export type updateHiringSelectionStatusPropDTO = z.infer<
  typeof updateHiringSelectionStatusDTO
>

export const getCandidateHiringListDTO = z.object({
  courseHiringId: z.string().min(1),
  step: z.enum(['first', 'second', 'selected']),
})

export type getCandidateHiringLisPropDTO = z.infer<
  typeof getCandidateHiringListDTO
>

export const coursePerHiringDTO = z.object({
  id: z.string(), // UUID del curso
  name: z.string(), // Nombre del curso
})

export type CoursePerHiringDTO = z.infer<typeof coursePerHiringDTO>

export const hiringsWithCoursesDTO = z.object({
  hiringId: z.number(), // ID de la tabla hirings como número
  hiringName: z.string(),
  endDate: z.date(), // Fecha convertida a tipo Date en el servicio
  coursesNumber: z.number(), // Número total de cursos
  coursesPerHiring: z.array(coursePerHiringDTO), // Nuevo array con objetos {id, name} para cada curso
})

export type HiringsWithCoursesDTO = z.infer<typeof hiringsWithCoursesDTO>

export const getHiringsWithCoursesQueryDTO = z.object({
  unitId: z.coerce.number(), // ID de la unidad
  q: z.string().optional(), // Para un filtro opcional de búsqueda
  page: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(5),
})

export type GetHiringsWithCoursesQueryDTO = z.infer<
  typeof getHiringsWithCoursesQueryDTO
>
