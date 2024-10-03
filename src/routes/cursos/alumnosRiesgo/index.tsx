import { createFileRoute } from '@tanstack/react-router'
import PermissionService from '@/security/services/permission.service'
import { QueryKeys } from '@/constants/queryKeys'
import RiskStudents from '@/courses/views/RiskStudentView'

export const Route = createFileRoute('/cursos/alumnosRiesgo/')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.PERMISSIONS],
      queryFn: () => PermissionService.getPermissions(),
    })
  },
  component: () => <RiskStudents />,
})
