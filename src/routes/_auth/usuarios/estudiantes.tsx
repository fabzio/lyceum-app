import { createFileRoute, redirect } from '@tanstack/react-router'
import Estudiantes from '@/modules/users/views/Students'
import { StudentsFilters } from '@/modules/users/views/Students/interfaces/CourseFIlters'
import { QueryKeys } from '@/constants/queryKeys'
import StudentService from '@/modules/users/services/Student.service'
import { haveSomePermission } from '@/lib/utils'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'

export const Route = createFileRoute('/_auth/usuarios/estudiantes')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.READ_STUDENTS,
        UserPermissionsDict.WRITE_STUDENTS,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () => ({}) as StudentsFilters,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.STUDENTS, {}],
      queryFn: () => StudentService.fetchStudents({}),
    })
  },
  component: () => <Estudiantes />,
})
