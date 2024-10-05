import { createFileRoute } from '@tanstack/react-router'
import PermissionService from '@/security/services/permission.service'
import { QueryKeys } from '@/constants/queryKeys'
import CodeRiskStudent from '@/courses/views/RiskStudentView/CodeRiskStudentView'
export const Route = createFileRoute('/cursos/alumnosRiesgo/$codigoAlumnoRiesgo/')({
    loader: async ({ context: { queryClient } }) => {
      return queryClient.ensureQueryData({
        queryKey: [QueryKeys.security.PERMISSIONS],
        queryFn: () => PermissionService.getPermissions(),
      })
    },
    component: () => <CodeRiskStudent />,
  })