import { StudyPlan } from '../interfaces/StudyPlan';

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
    // Mock data for study plans
    const mockData: StudyPlan[] = [
      { id: '1', init_term: 2021, end_term: 2023 },
      { id: '2', init_term: 2020, end_term: 2022 },
      { id: '3', init_term: 2019, end_term: 2021 },
    ];

    // Simulating a delay like an HTTP request
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 500); // 500ms delay
    });
  }
}

export default StudyPlanService;
