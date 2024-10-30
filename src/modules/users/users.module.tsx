import { AppModule } from '@/interfaces/AppModule'
import { UserPermissionsDict } from '@/interfaces/enums/permissions/Users'
import { Users } from 'lucide-react'

export const UserModule: AppModule = {
  icon: <Users />,
  path: '/usuarios',
  label: 'Gestión de Usuarios',
  description: 'Gestión de usuarios del sistema',
  code: 'USERS',
  submodules: [
    {
      label: 'Estudiantes',
      path: '/usuarios/',
      permissions: [
        UserPermissionsDict.READ_STUDENTS,
        UserPermissionsDict.WRITE_STUDENTS,
      ],
    },
    {
      label: 'Profesores',
      path: '/usuarios/docentes',
      permissions: [
        UserPermissionsDict.READ_PROFESSORS,
        UserPermissionsDict.WRITE_PROFESSORS,
      ],
    },
    {
      label: 'Administrativos',
      path: '/usuarios/administrativos',
      permissions: [
        UserPermissionsDict.READ_ADMINISTRIVES,
        UserPermissionsDict.WRITE_ADMINISTRIVES,
      ],
    },
    {
      label: 'Externos',
      path: '/usuarios/externos',
      permissions: [UserPermissionsDict.READ_EXTERNALS],
    },
  ],
}
