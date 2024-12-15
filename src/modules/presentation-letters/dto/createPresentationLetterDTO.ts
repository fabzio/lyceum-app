import { z } from 'zod'

const createPresentationLetterDTO = z.object({
  companyName: z.string(),
  scheduleId: z.coerce.number(),
  //documentFile: z.instanceof(File),
  description: z.string(),
  accounts: z.string(),
})

export default createPresentationLetterDTO
