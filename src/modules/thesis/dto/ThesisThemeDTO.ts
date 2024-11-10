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
  roleId: z.coerce.number(),
  content: z.union([z.string(), z.instanceof(File)]),
  isFile: z.string().transform((value) => value === 'true'),
  action: z.enum(['sended', 'approved', 'denied']),
})

export type InsertThesisActionDTO = z.infer<typeof insertThesisActionDTO>
