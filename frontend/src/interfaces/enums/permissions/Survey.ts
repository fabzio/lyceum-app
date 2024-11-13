export const SurveyPermissionsDict = {
  CREATE_SURVEY: 'CREATE_SURVEY',
  READ_SURVEY: 'READ_SURVEY',
  READ_SURVEY_RESULTS: 'READ_SURVEY_RESULTS',
  ANSWER_SURVEY: 'ANSWER_SURVEY',
} as const

export type SurveyPermissionsDict = keyof typeof SurveyPermissionsDict
