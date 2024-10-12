import { Course } from '../interfaces/Course';
import http from '@/lib/http';


class CourseService {

  static async fetchCourses(): Promise<Course[]> {
    const res = await http.get('/study-plan/courses');
    console.log('Fetched Courses:', res.data.data);
    return res.data.data as Course[];
  }

  static async addCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500));
  }

  static async updateCourse(course: Course): Promise<Course> {
    return new Promise((resolve) => setTimeout(() => resolve(course), 500));
  }
}

export default CourseService;