import { createFileRoute } from '@tanstack/react-router'
import { QueryKeys } from '@/constants/queryKeys'
import RolePermissionService from '@/security/services/role-permission.service'
import RetirementStudents from '@/courses/views/RetirementStudentView'

export const Route = createFileRoute('/cursos/retiroAlumnos')({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      queryFn: () => RolePermissionService.getRolePermissions(),
    })
  },
  component: () => < RetirementStudents/>,
})
