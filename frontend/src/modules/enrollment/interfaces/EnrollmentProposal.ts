import { CourseProposal } from "./CourseProposal";

export default interface EnrollmentProposal {
    courseId: number;
    courseName: string;
    schedules: CourseProposal[]; // Lista de cursos asociados a la propuesta de matrícula
}
