import { RiskStudentGeneral } from '@frontend/modules/student-process/interfaces/RIskStudentGeneral'

export interface RiskStudentStore {
  selectedRiskStudent: null | RiskStudentGeneral
  setSelectedRiskStudent: (student: RiskStudentGeneral) => void
}
