import { schema } from '..'

export const unitType = schema.enum('unit_type', [
  'university',
  'faculty',
  'department',
  'speciality',
  'section',
  'area',
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

export const thesisRequestStatus = schema.enum('thesis_request_step', [
  'sended',
  'denied',
  'approved',
])
