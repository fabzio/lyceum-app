import { PermissionCode } from '@frontend/interfaces/enums/permissions'
import { useSessionStore } from '@frontend/store'

interface Props {
  permissions: PermissionCode[] | PermissionCode
  some?: boolean
  all?: boolean
  children: React.ReactNode
}

export default function Need({
  permissions,
  children,
  all = true,
  some,
}: Props) {
  const { havePermission } = useSessionStore()

  const permissionsArray = Array.isArray(permissions)
    ? permissions
    : [permissions]

  if (all) {
    if (permissionsArray.every((permission) => havePermission(permission))) {
      return <>{children}</>
    }
  }
  if (some) {
    if (permissionsArray.some((permission) => havePermission(permission))) {
      return <>{children}</>
    }
  }
  return null
}
