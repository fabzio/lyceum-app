import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const RepeatedProfessorError = createErrorFactory(
  'RepeatedProfessorError',
  404
)

export const NoProfessorsSendedError = createErrorFactory(
  'NoProfessorsSendedError',
  404
)

export const ScheduleNotFoundError = createErrorFactory(
  'ScheduleNotFoundError',
  404
)

export const ProfessorAlreadyAddedError = createErrorFactory(
  'ProfessorAlreadyAddedError',
  404
)

export const LeadProfessorAlreadyExistsError = createErrorFactory(
  'LeadProfessorAlreadyExistsError',
  404
)
