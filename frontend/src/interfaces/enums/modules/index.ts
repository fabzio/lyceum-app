export const ModulesDict = {
  HOME: 'HOME',
  THESIS: 'THESIS',
  STUDY_PROCESS: 'STUDY_PROCESS',
  STUDY_PLAN: 'STUDY_PLAN',
  ENROLLMENT: 'ENROLLMENT',
  USERS: 'USERS',
  SECURITY: 'SECURITY',
  FAQ: 'FAQ',
  UNITS: 'UNITS',
  HIRING: 'HIRING',
  SURVEYS: 'SURVEYS',
} as const

export type ModulesDict = (typeof ModulesDict)[keyof typeof ModulesDict]
