import { ThesisActionsSchema } from '@/database/schema/thesisActions'
import { z } from 'zod'

export const createThesisDTO = z.object({
  title: z.string(),
  areaId: z.number(),
  applicantCode: z.string(),
  advisors: z.array(z.string()),
  students: z.array(z.string()),
})

export type CreateThesisDTO = z.infer<typeof createThesisDTO>

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
