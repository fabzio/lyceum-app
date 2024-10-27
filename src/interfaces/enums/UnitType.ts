export const UnitType = {
  FACULTY: 'faculty',
  DEPARTMENT: 'department',
  SPECIALTY: 'speciality',
  SECTION: 'section',
  UNIVERSITY: 'university',
  AREA: 'area',
}
export type UnitType = (typeof UnitType)[keyof typeof UnitType]
