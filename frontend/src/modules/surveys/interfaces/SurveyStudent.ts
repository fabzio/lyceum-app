export type SurveyStudent = {
  id: number
  name: string
  endDate: Date
  creationDate: Date
  type: string
  schedules: SurveySchedule[]
}

export interface SurveySchedule {
  scheduleId: number
  scheduleCode: string
  courseName: string
  accounts: Account[]
}

export interface Account {
  id: string
  name: string
  firstSurname: string
  secondSurname: string
  roleId: number
}
