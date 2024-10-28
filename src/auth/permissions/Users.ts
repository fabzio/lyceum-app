export const UserPermissionsDict = {
  READ_STUDENTS: 'READ_STUDENTS',
  WRITE_STUDENTS: 'WRITE_STUDENTS',
  READ_PROFESSORS: 'READ_PROFESSORS',
  WRITE_PROFESSORS: 'WRITE_PROFESSORS',
  READ_ADMINISTRIVES: 'READ_ADMINISTRIVES',
  WRITE_ADMINISTRIVES: 'WRITE_ADMINISTRIVES',
  READ_EXTERNALS: 'READ_EXTERNALS',
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
