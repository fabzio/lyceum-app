export const UnitType = {
  FACULTY: 'FACULTY',
  DEPARTMENT: 'DEPARTMENT',
  SPECIALTY: 'SPECIALTY',
  SECTION: 'SECTION',
  UNIVERSITY: 'UNIVERSITY',
}

export type UnitType = (typeof UnitType)[keyof typeof UnitType]
