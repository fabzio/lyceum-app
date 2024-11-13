import { z } from 'zod'

export const createHiringSelectionDTO = z.object({
  description: z.string().min(1),
  unitId: z.coerce.number(),
  startDate: z.date(),
  endReceivingDate: z.date(),
  resultsPublicationDate: z.date(),
  endDate: z.date(),
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
  q: z.string().optional(), // Para un filtro opcional de búsqueda
  page: z
    .string()
    .transform((v) => parseInt(v))
    .optional()
    .default('1'), // Paginación
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .optional()
    .default('10'), // Límite de resultados
})

export type GetHiringsWithCoursesQueryDTO = z.infer<
  typeof getHiringsWithCoursesQueryDTO
>
