export const UserPermissionsDict = {
  READ_STUDENTS: 'Ver estudiantes',
  WRITE_STUDENTS: 'Crear estudiantes',
  READ_PROFESSORS: 'Ver profesores',
  WRITE_PROFESSORS: 'Crear profesores',
  READ_ADMINISTRIVES: 'Ver administrativos',
  WRITE_ADMINISTRIVES: 'Crear administrativos',
  READ_EXTERNALS: 'Ver externos',
} as const
export type UserPermissionsKey = keyof typeof UserPermissionsDict

const UserPermissions = [
  {
    name: UserPermissionsDict.READ_STUDENTS,
    description: 'Ver estudiantes',
  },
  {
    name: UserPermissionsDict.WRITE_STUDENTS,
    description: 'Crear estudiantes',
  },
  {
    name: UserPermissionsDict.READ_PROFESSORS,
    description: 'Ver profesores',
  },
  {
    name: UserPermissionsDict.WRITE_PROFESSORS,
    description: 'Crear profesores',
  },
  {
    name: UserPermissionsDict.READ_ADMINISTRIVES,
    description: 'Ver administrativos',
  },
  {
    name: UserPermissionsDict.WRITE_ADMINISTRIVES,
    description: 'Crear administrativos',
  },
  {
    name: UserPermissionsDict.READ_EXTERNALS,
    description: 'Ver externos',
  },
] as const

export default UserPermissions
