export interface SurveyQuestions {
  id: number
  name: string
  questions: Question[]
}

export interface Question {
  id: number
  type: 'text' | 'multiple' | 'boolean'
  questionText: string
  surveyId: number
}
