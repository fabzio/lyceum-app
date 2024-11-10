export const UnitPermissionsDict = {
  READ_UNIVERSITY: 'READ_UNIVERSITY',
  WRITE_UNIVERSITY: 'WRITE_UNIVERSITY',
  READ_FACULTY: 'READ_FACULTY',
  WRITE_FACULTY: 'WRITE_FACULTY',
  READ_DEPARTMENT: 'READ_DEPARTMENT',
  WRITE_DEPARTMENT: 'WRITE_DEPARTMENT',
  READ_SECTION: 'READ_SECTION',
  WRITE_SECTION: 'WRITE_SECTION',
  READ_AREAS: 'READ_AREAS',
  READ_SPECIALTIES: 'READ_SPECIALTIES',
} as const

const UnitPermissions = [
  {
    name: UnitPermissionsDict.READ_UNIVERSITY,
    description: 'Ver información de universidad',
  },
  {
    name: UnitPermissionsDict.WRITE_UNIVERSITY,
    description: 'Editar información de universidad',
  },
  {
    name: UnitPermissionsDict.READ_FACULTY,
    description: 'Ver información de facultad',
  },
  {
    name: UnitPermissionsDict.WRITE_FACULTY,
    description: 'Editar información de facultad',
  },
  {
    name: UnitPermissionsDict.READ_DEPARTMENT,
    description: 'Ver información de departamento',
  },
  {
    name: UnitPermissionsDict.WRITE_DEPARTMENT,
    description: 'Editar información de departamento',
  },
  {
    name: UnitPermissionsDict.READ_SECTION,
    description: 'Ver información de sección',
  },
  {
    name: UnitPermissionsDict.WRITE_SECTION,
    description: 'Editar información de sección',
  },
  {
    name: UnitPermissionsDict.READ_AREAS,
    description: 'Ver información de áreas',
  },
  {
    name: UnitPermissionsDict.READ_SPECIALTIES,
    description: 'Ver información de especialidades',
  },
] as const

export default UnitPermissions
