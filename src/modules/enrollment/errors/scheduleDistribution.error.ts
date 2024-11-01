import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const RepeatedProfessorError = createErrorFactory(
  'RepeatedProfessorError',
  400
)

export const NoProfessorsSendedError = createErrorFactory(
  'NoProfessorsSendedError',
  400
)

export const ScheduleNotFoundError = createErrorFactory(
  'ScheduleNotFoundError',
  404
)

export const ProfessorAlreadyAddedError = createErrorFactory(
  'ProfessorAlreadyAddedError',
  409
)

export const LeadProfessorAlreadyExistsError = createErrorFactory(
  'LeadProfessorAlreadyExistsError',
  409
)
