import { z } from 'zod'

const updatePresentationLetterDTO = z.object({
  reviewerId: z.string(),
  status: z.enum(['sent', 'accepted', 'rejected', 'succeeded']),
  observation: z.string(),
})

export default updatePresentationLetterDTO

export type UpdatePresentationLetterDTO = z.infer<
  typeof updatePresentationLetterDTO
>
