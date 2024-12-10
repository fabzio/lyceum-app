import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const DocumentError = createErrorFactory('DocumentError', 500)
