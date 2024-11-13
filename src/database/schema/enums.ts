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

// Nuevos enums
export const identityType = schema.enum('identity_type', [
  'national',
  'foreign',
])
export const jobRequestState = schema.enum('job_request_state', [
  'sent',
  'rejected',
  'to_evaluate',
  'evaluated',
  'selected',
])

export const hiringStatus = schema.enum('hiring_status', [
  'receiving',
  'evaluating',
  'finished',
])

export const hiringType = schema.enum('hiring_type', [
  'candidate',
  'reviewer',
  'evaluator',
  'selector',
])

export const courseStep = schema.enum('course_step', ['phase1', 'phase2'])

export const surveyQuestionType = schema.enum('survey_question_type', [
  'multiple',
  'text',
])

export const surveyType = schema.enum('survey_type', ['midterm', 'annual'])
