import { createFileRoute } from '@tanstack/react-router'
import Estudiantes from '@/modules/users/views/Students'
import { StudentsFilters } from '@/modules/users/views/Students/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import StudentService from '@/modules/users/services/Student.service'

export const Route = createFileRoute('/_auth/usuarios/')({
  validateSearch: () => ({}) as StudentsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.STUDENTS, {}],
      queryFn: () => StudentService.fetchStudents({}),
    })
  },
  component: () => <Estudiantes />,
})
