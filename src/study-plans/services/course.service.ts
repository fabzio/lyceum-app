import { Course } from '../interfaces/Course';

/*
import http from '@/lib/http';

class CourseService {
  
  static async fetchCourses(): Promise<Course[]> {
    const res = await http.get('/courses');
    return res.data as Course[];
  }
}

export default CourseService;
*/

class CourseService {
  static async fetchCourses(): Promise<Course[]> {
    const mockData: Course[] = [
      { id: 'C1', code: 'CS101', name: 'Introduction to Computer Science', credits: 3 },
      { id: 'C2', code: 'MATH102', name: 'Calculus I', credits: 4 },
      { id: 'C3', code: 'ENG103', name: 'English Literature', credits: 2 },
    ];
    return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
  }

  static async addCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500));
  }

  static async updateCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500));
  }
}

export default CourseService;