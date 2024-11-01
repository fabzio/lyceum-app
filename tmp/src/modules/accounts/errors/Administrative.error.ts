import { createErrorFactory } from '@/middlewares/errorMiddlewares'

export const AdministrativeNotFound = createErrorFactory(
  'AdministrativeNotFound',
  404
) //Con createErrorFactory estoy creando una clase llamada AdministrativeNotFound

export const DuplicateAdministrativeCode = createErrorFactory(
  'DuplicateAdministrativeCode',
  409
) 

