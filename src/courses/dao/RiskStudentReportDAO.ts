import { RiskStudentReport } from '@/interfaces/models/RiskStudentReport'

export interface RiskStudentReportDAO {
  getAllRiskStudentReport: () => Promise<RiskStudentReport[]>
}
