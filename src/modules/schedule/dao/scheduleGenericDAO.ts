//import { Course } from '@/interfaces/models/Course'
export interface ScheduleGenericDAO {
    fetchSchedulesByCourse: (
      courseId: number
    ) => Promise<{
      id: number;
      code: string;
      termId: number; 
      state: 'saved' | 'editing'; 
      visibility: boolean;
    }[]>;
  }