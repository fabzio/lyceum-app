import { z } from 'zod'

export const changeStateToApprovedDTO = z.object({
  enrollmentProposalId: z.number().min(1),
})

export type changeStateToApprovedDTO = z.infer<typeof changeStateToApprovedDTO>
