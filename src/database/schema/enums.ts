import { schema } from '..'

export const unitType = schema.enum('unit_type', [
  'university',
  'faculty',
  'department',
  'speciality',
  'section',
])

export const accountStatus = schema.enum('account_status', [
  'active',
  'inactive',
  'deleted',
])

export const scheduleStatus = schema.enum('schedule_status', [
  'visible',
  'hidden',
  'finished',
  'approved',
])
