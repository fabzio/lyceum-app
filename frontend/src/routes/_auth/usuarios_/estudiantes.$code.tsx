import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { haveSomePermission } from '@/lib/utils'
import StudentService from '@/modules/users/services/Student.service'
import StudentDetail from '@/modules/users/views/Students/StudentDetail'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/estudiantes/$code')({
  beforeLoad: ({ context: { sessionStore } }) => {
    const { getAllPermissions } = sessionStore
    if (
      !haveSomePermission(getAllPermissions(), [
        UserPermissionsDict.WRITE_STUDENTS,
      ])
    ) {
      throw redirect({
        to: '/',
      })
    }
  },
  validateSearch: () =>
    ({}) as {
      mode: 'create' | 'edit' | 'view'
    },
  component: () => <StudentDetailPage />,
  loader: async ({ params: { code }, context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.users.STUDENTS, code],
      queryFn: () => StudentService.getStudentDetail(code),
    })
  },
})

function StudentDetailPage() {
  return (
    <TransitionPage>
      <StudentDetail />
    </TransitionPage>
  )
}
