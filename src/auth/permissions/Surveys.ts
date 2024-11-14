export const SurveyPermissionsDict = {
  CREATE_SURVEY: 'CREATE_SURVEY',
  READ_SURVEY: 'READ_SURVEY',
  READ_SURVEY_RESULTS: 'READ_SURVEY_RESULTS',
  ANSWER_SURVEY: 'ANSWER_SURVEY',
}

const SurveyPermissions = [
  {
    name: SurveyPermissionsDict.CREATE_SURVEY,
    description: 'Crear encuesta',
  },
  {
    name: SurveyPermissionsDict.READ_SURVEY,
    description: 'Ver encuestas',
  },
  {
    name: SurveyPermissionsDict.READ_SURVEY_RESULTS,
    description: 'Ver resultados de encuestas',
  },
  {
    name: SurveyPermissionsDict.ANSWER_SURVEY,
    description: 'Responder encuestas',
  },
]

export default SurveyPermissions
