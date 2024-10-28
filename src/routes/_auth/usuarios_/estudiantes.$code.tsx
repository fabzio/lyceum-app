import TransitionPage from '@/components/anim/TransitionPage'
import { QueryKeys } from '@/constants/queryKeys'
import StudentService from '@/modules/users/services/Student.service'
import StudentDetail from '@/modules/users/views/Students/StudentDetail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/estudiantes/$code')({
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
