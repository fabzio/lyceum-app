import { AppModule } from '@frontend/interfaces/AppModule'
import { SecurityPermissionsDict } from '@frontend/interfaces/enums/permissions/Security'
import { ShieldCheck } from 'lucide-react'

export const SecurityModule: AppModule = {
  code: 'SECURITY',
  label: 'Seguridad',
  description: 'Módulo de seguridad',
  icon: <ShieldCheck />,
  path: '/seguridad',
  submodules: [
    {
      label: 'Asignación de roles',
      path: '/seguridad/asignacion-roles',
      permissions: [SecurityPermissionsDict.ASSING_ROLES],
    },
    {
      label: 'Gestión de roles',
      path: '/seguridad/roles',
      permissions: [
        SecurityPermissionsDict.CREATE_ROLES,
        SecurityPermissionsDict.READ_ROLES,
      ],
    },
    {
      label: 'Permisos del sistema',
      path: '/seguridad/permisos',
      permissions: [SecurityPermissionsDict.READ_PERMISSIONS],
    },
  ],
}
