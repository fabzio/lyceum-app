import SubRoutesManagement from '@/components/SubRoutesManagement'
import { Tab } from '@/lib/utils'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'

export default function UserManagement() {

  return <SubRoutesManagement tabs={tabs} />
}
const tabs: Tab[] = [
  {
    path: '/usuarios/estudiantes',
    label: 'Estudiantes',
    permissions: [
      UserPermissionsDict.READ_STUDENTS,
      UserPermissionsDict.WRITE_STUDENTS,
    ],
  },
  {
    path: '/usuarios/docentes',
    label: 'Docentes',
    permissions: [
      UserPermissionsDict.READ_PROFESSORS,
      UserPermissionsDict.WRITE_PROFESSORS,
    ],
  },
  {
    path: '/usuarios/administrativos',
    label: 'Administrativos',
    permissions: [
      UserPermissionsDict.READ_ADMINISTRIVES,
      UserPermissionsDict.WRITE_ADMINISTRIVES,
    ],
  },
  {
    path: '/usuarios/externos',
    label: 'Externos',
    permissions: [UserPermissionsDict.READ_EXTERNALS],
  },
]
