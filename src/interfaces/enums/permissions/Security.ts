export const SecurityPermissionsDict = {
  READ_PERMISSIONS: 'READ_PERMISSIONS',
  CREATE_ROLES: 'CREATE_ROLES',
  READ_ROLES: 'READ_ROLES',
  ASSING_ROLES: 'ASSING_ROLES',
  READ_ASSIGN_ROLES: 'READ_ASSIGN_ROLES',
}

export type SecurityPermissionsDict = keyof typeof SecurityPermissionsDict
const SecurityPermissions = [
  {
    name: SecurityPermissionsDict.READ_PERMISSIONS,
    description: 'Ver permisos del sistema',
  },
  {
    name: SecurityPermissionsDict.CREATE_ROLES,
    description: 'Crear roles del sistema',
  },
  {
    name: SecurityPermissionsDict.READ_ROLES,
    description: 'Ver roles del sistema',
  },
  {
    name: SecurityPermissionsDict.ASSING_ROLES,
    description: 'Asignar roles a usuarios',
  },
  {
    name: SecurityPermissionsDict.READ_ASSIGN_ROLES,
    description: 'Ver roles asignados a usuarios',
  },
] as const
export default SecurityPermissions
