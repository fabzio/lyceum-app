import { createFileRoute } from '@tanstack/react-router'
import ScheduleManagement from '@frontend/modules/student-process/views/ScheduleManagement'
import { StudentsFilters } from '@frontend/modules/users/views/Students/interfaces/CourseFIlters'

export const Route = createFileRoute('/_auth/cursos/horarios')({
  validateSearch: () => ({}) as StudentsFilters,
  component: () => <ScheduleManagement />,
})