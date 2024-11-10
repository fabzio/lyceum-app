import { UnitType } from '@frontend/interfaces/models'

export const mapUnitType = {
  [UnitType.UNIVERSITY]: 'Universidad',
  [UnitType.FACULTY]: 'Facultad',
  [UnitType.DEPARTMENT]: 'Departamento',
  [UnitType.SPECIALTY]: 'Especialidad',
  [UnitType.SECTION]: 'Sección',
  [UnitType.AREA]: 'Área',
} as const

export const mapParentUnitType = {
  [UnitType.UNIVERSITY]: null,
  [UnitType.FACULTY]: UnitType.UNIVERSITY,
  [UnitType.SPECIALTY]: UnitType.FACULTY,
  [UnitType.AREA]: UnitType.SPECIALTY,
  [UnitType.DEPARTMENT]: UnitType.UNIVERSITY,
  [UnitType.SECTION]: UnitType.DEPARTMENT,
} as const
