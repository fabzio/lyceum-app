import { Account } from './Account'
import { RiskCard } from './RiskCard'
export interface RiskStudent {
  id: number
  cuenta: Account
  curso: string
  motivo: string
  ultimaPuntuacion: number
  historialRiesgo: RiskCard[]
}
