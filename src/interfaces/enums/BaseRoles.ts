export const BaseRoles = {
  STUDENT: 1,
  TEACHER: 2,
  ADMIN: 3,
  EXTERNAL: 4,
}

export type BaseRoles = (typeof BaseRoles)[keyof typeof BaseRoles]
