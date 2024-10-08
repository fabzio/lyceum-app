import { RiskStudentGeneral } from '@/courses/interfaces/RIskStudentGeneral'

export interface RiskStudentStore {
  selectedRiskStudent: null | RiskStudentGeneral
  setSelectedRiskStudent: (student: RiskStudentGeneral) => void
}
