export const UnitType = {
  UNIVERSITY: 'university',
  DEPARTMENT: 'department',
  SECTION: 'section',
  AREA: 'area',
  FACULTY: 'faculty',
  SPECIALTY: 'speciality',
} as const
export type UnitType = (typeof UnitType)[keyof typeof UnitType]
