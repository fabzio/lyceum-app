import { RiskStudentGeneral } from '@/modules/student-process/interfaces/RIskStudentGeneral'

export interface RiskStudentStore {
  selectedRiskStudent: null | RiskStudentGeneral
  setSelectedRiskStudent: (student: RiskStudentGeneral) => void
}
