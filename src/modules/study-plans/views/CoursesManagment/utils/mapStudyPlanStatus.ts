export const mapStudyPlanStatus = {
  editing: 'En edición',
  saved: 'Guardado',
} as const

export type StudyPlanStatus = keyof typeof mapStudyPlanStatus
