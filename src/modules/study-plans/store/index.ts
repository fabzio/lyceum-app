import { create } from 'zustand'
import { Course } from '@/modules/study-plans/interfaces/Course'
import { StudyPlan } from '@/modules/study-plans/interfaces/StudyPlan'
import { StudyPlanCourse } from '@/modules/study-plans/interfaces/StudyPlanCourse'
import { SpecialityStudyPlan } from '@/modules/study-plans/interfaces/SpecialityStudyPlan'

interface StudyPlanStore {
  courses: Course[]
  studyPlans: StudyPlan[]
  studyPlanCourses: StudyPlanCourse[]
  specialityStudyPlans: SpecialityStudyPlan[]
  addCourse: (course: Course) => void
  addStudyPlan: (studyPlan: StudyPlan) => void
  addStudyPlanCourse: (studyPlanCourse: StudyPlanCourse) => void
  addSpecialityStudyPlan: (specialityStudyPlan: SpecialityStudyPlan) => void
}

const useStudyPlanStore = create<StudyPlanStore>((set) => ({
  courses: [],
  studyPlans: [],
  studyPlanCourses: [],
  specialityStudyPlans: [],
  addCourse: (course) =>
    set((state) => ({ courses: [...state.courses, course] })),
  addStudyPlan: (studyPlan) =>
    set((state) => ({ studyPlans: [...state.studyPlans, studyPlan] })),
  addStudyPlanCourse: (studyPlanCourse) =>
    set((state) => ({
      studyPlanCourses: [...state.studyPlanCourses, studyPlanCourse],
    })),
  addSpecialityStudyPlan: (specialityStudyPlan) =>
    set((state) => ({
      specialityStudyPlans: [
        ...state.specialityStudyPlans,
        specialityStudyPlan,
      ],
    })),
}))

export default useStudyPlanStore
