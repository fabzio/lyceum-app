import { schema } from "..";

export const unitType = schema.enum('unit_type', [
  'university',
  'faculty',
  'department',
  'speciality',
  'section',
])
