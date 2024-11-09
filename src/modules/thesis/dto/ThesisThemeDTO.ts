import { ThesisActionsSchema } from '@/database/schema/thesisActions'
import { z } from 'zod'

export const createThesisDTO = z.object({
  title: z.string(),
  areaId: z.string(),
  applicantCode: z.string(),
  advisors: z.string(),
  students: z.string(),
  justification: z.instanceof(File),
})

type schema = Omit<ThesisActionsSchema, 'requestId'> & {
  requestCode: string
}

export const insertThesisActionDTO = z.object({
  accountId: z.string(),
  roleId: z.number(),
  content: z.string(),
  isFile: z.boolean(),
  action: z.enum(['sended', 'approved', 'denied']),
})

export type InsertThesisActionDTO = z.infer<typeof insertThesisActionDTO>
