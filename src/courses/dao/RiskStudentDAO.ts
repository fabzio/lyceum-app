import { RiskStudent } from '@/interfaces/models/RiskStudent'

export interface RiskStudentDAO {
  getAllRiskStudent: () => Promise<RiskStudent[]>
}
