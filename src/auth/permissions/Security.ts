export const SecurityPermissionsDict = {
  READ_PERMISSIONS: 'Ver permisos del sistema',
  CREATE_ROLES: 'Crear roles del sistema',
  READ_ROLES: 'Ver roles del sistema',
  ASSING_ROLES: 'Asignar roles a usuarios',
  READ_ASSIGN_ROLES: 'Ver roles asignados a usuarios',
}

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
