import { create } from 'zustand';
import { Course } from '@/study-plans/interfaces/Course';
import CourseService from '@/study-plans/services/course.service';

interface CourseStore {
  courses: Course[];
  fetchCourses: () => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  openModal: boolean;
  toggleModal: () => void;
  editingCourse: Course | null;
  setEditingCourse: (course: Course | null) => void;
}

const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  openModal: false,
  editingCourse: null,
  
  fetchCourses: async () => {
    const courses = await CourseService.fetchCourses();
    console.log('Fetched Courses in Store:', courses);
    set({ courses });
  },
  addCourse: (course: Course) => set((state) => ({
    courses: [...state.courses, course],
  })),
  updateCourse: (course: Course) => set((state) => ({
    courses: state.courses.map((c) => (c.id === course.id ? course : c)),
  })),
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),
  setEditingCourse: (course: Course | null) => set({ editingCourse: course }),
}));

export default useCourseStore;
