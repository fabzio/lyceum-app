import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createRiskStudentSlice from './RiskStudents/riskStudent.store'
import { StoreType } from './types'

const useCourseStore = create<StoreType>()(
  devtools(
    persist(
      (...a) => ({
        ...createRiskStudentSlice(...a),
      }),
      {
        name: 'course-store',
      }
    )
  )
)

export default useCourseStore
