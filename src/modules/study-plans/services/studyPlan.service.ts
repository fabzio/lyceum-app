import { StudyPlan } from '../interfaces/StudyPlan'

/*
import http from '@/lib/http';


class StudyPlanService {
  static async fetchStudyPlans(): Promise<StudyPlan[]> {
    const res = await http.get('/study-plans');
    return res.data as StudyPlan[];
  }
}

export default StudyPlanService;
*/

class StudyPlanService {
  static async fetchStudyPlans(): Promise<StudyPlan[]> {
    // TODO Implementar llamada a la API para obtener los planes de estudio,con manejo de errores (ver servicios de tesis)
    // Mock data for study plans
    const mockData: StudyPlan[] = [
      { id: '1', initTerm: 2021, endTerm: 2023 },
      { id: '2', initTerm: 2020, endTerm: 2022 },
      { id: '3', initTerm: 2019, endTerm: 2021 },
    ]

    // Simulating a delay like an HTTP request
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 500) // 500ms delay
    })
  }

  static async getStudyPlanDetail(): Promise<StudyPlan> {
    // Mock data for study plans
    const mockData: StudyPlan = { id: '1', initTerm: 2021, endTerm: 2023 }
    // Simulating a delay like an HTTP request
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 500) // 500ms delay
    })
  }
}

export default StudyPlanService
