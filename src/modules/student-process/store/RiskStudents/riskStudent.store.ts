import { SliceStore } from '../types'
import { RiskStudentStore } from './types'

const createRiskStudentSlice: SliceStore<RiskStudentStore> = (set) => ({
  selectedRiskStudent: null,
  setSelectedRiskStudent: (student) => set({ selectedRiskStudent: student }),
})

export default createRiskStudentSlice
