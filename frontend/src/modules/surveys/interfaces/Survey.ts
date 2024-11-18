export type Survey = {
  id: number
  active: boolean
  surveyType: 'midterm' | 'annual'
  name: string
  endDate: Date
  creatorId: string
  creationDate: Date
}
