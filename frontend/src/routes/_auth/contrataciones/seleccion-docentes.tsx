import { QueryKeys } from '@frontend/constants/queryKeys'
import HiringService from '@frontend/modules/hiring/Services/Hirings.service'
import TeacherSelection from '@frontend/modules/hiring/views/TeacherSelection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/contrataciones/seleccion-docentes'
)({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData({
      queryKey: [QueryKeys.hiring.HIRINGS],
      queryFn: HiringService.getHirings,
    }),
  component: () => <TeacherSelection />,
})
