export type StudyPlan = {
  id: number
  initTerm: number
  endTerm?: number
  current: boolean
  state: string
  levelsCount: number
  startLevel: number
  description: string
}
