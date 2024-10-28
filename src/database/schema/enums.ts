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
  'saved',
  'editing',
])

export const thesisRequestStatus = schema.enum('thesis_request_step', [
  'sended',
  'denied',
  'approved',
])

export const thesisJuryStatus = schema.enum('thesis_jury_status', [
  'unassigned',
  'requested',
  'assigned',
])

export const enrollmentModifcationStatus = schema.enum(
  'enrollment_modification_status',
  ['requested', 'approved', 'denied']
)

export const enrollmentRequestType = schema.enum('enrollment_request_type', [
  'aditional',
  'withdrawal',
])

export const studyPlanStatus = schema.enum('study_plan_status', [
  'editing',
  'saved',
])

export const enrollmentProposalStatus = schema.enum(
  'enrollment_proposal_status',
  ['requested', 'sended', 'aproved', 'assigned']
)
