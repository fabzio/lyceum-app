import { createFileRoute, redirect } from '@tanstack/react-router'
import Estudiantes from '@frontend/modules/users/views/Students'
import { StudentsFilters } from '@frontend/modules/users/views/Students/interfaces/CourseFIlters'
import { QueryKeys } from '@frontend/constants/queryKeys'
import StudentService from '@frontend/modules/users/services/Student.service'
import { haveSomePermission } from '@frontend/lib/utils'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'

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
