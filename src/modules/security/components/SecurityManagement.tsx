import SubRoutesManagement from '@/components/SubRoutesManagement'
import { SecurityPermissionsDict } from '@/interfaces/enums/permissions/Security'
import { Tab } from '@/lib/utils'

export default function SecurityManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/seguridad/asignacion-roles',
    label: 'Asignar roles',
    permissions: [
      SecurityPermissionsDict.ASSING_ROLES,
      SecurityPermissionsDict.READ_ASSIGN_ROLES,
    ],
  },
  {
    path: '/seguridad/roles',
    label: 'Gestión de roles',
    permissions: [
      SecurityPermissionsDict.CREATE_ROLES,
      SecurityPermissionsDict.READ_ROLES,
    ],
  },
  {
    path: '/seguridad/permisos',
    label: 'Permisos',
    permissions: [SecurityPermissionsDict.READ_PERMISSIONS],
  },
]
