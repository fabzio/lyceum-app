import { Account } from '@frontend/interfaces/models/Account'

export interface SurveyManagementDetail {
  id: number
  name: string
  questions: Question[]
}

export interface Question {
  id: number
  type: 'boolean' | 'text' | 'multiple'
  questionText: string
  surveyId: number
  answers: Answer[]
}

export type Answer = {
  id: number
  questionId: number
  subjectAccountId: string
  scheduleId: number
  answerRawText: string
  schedule: Schedule
  account: Account
}

export interface Schedule {
  code: string
  course: Course
}

export interface Course {
  name: string
  code: string
}
