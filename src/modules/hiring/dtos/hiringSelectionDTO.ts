import { z } from 'zod'

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
