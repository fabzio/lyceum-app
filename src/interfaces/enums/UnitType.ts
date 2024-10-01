export const UnitType = {
  FACULTY: 'faculty',
  DEPARTMENT: 'department',
  SPECIALTY: 'speciality',
  SECTION: 'section',
  UNIVERSITY: 'university',
}
export type UnitType = (typeof UnitType)[keyof typeof UnitType]
