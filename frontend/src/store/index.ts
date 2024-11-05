import { Account } from '@frontend/interfaces/models/Account'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ModulesDict } from '@frontend/interfaces/enums/modules'
import { PermissionCode } from '@frontend/interfaces/enums/permissions'

export type Session = {
  id: Account['id']
  name: Account['name']
  surname: string
  email: string
  code: string
  allowedModules: ModulesDict[]
  roles: {
    roleId: number
    unitId: number
    permissions: {
      permission: PermissionCode
      module: ModulesDict
    }[]
  }[]
  term: {
    id: number
    name: string
  }
}
export type SessionStore = {
  session: Session | null
  syncSession: (session: Session) => void
  getAllowedModules: () => ModulesDict[]
  getRoleWithPermission: (permission: PermissionCode) => {
    roleId: number
    unitId: number
  } | null
  getAllPermissions: () => PermissionCode[]
  havePermission: (permission: PermissionCode) => boolean
  resetSession: () => void
  getFullName: () => string
}

const middlewares = (f: StateCreator<SessionStore>) =>
  devtools(persist(f, { name: 'session-store' }))

export const useSessionStore = create<SessionStore>()(
  middlewares((set, get) => ({
    session: null,
    syncSession: (session) => set({ session }),
    getAllowedModules: () => get().session?.allowedModules || [],
    havePermission: (permission) =>
      get().session?.roles.some((role) =>
        role.permissions.some(
          (rolePermission) => rolePermission.permission === permission
        )
      ) || false,
    getRoleWithPermission: (permission) => {
      return (
        get().session?.roles.find((role) =>
          role.permissions.some(
            (rolePermission) => rolePermission.permission === permission
          )
        ) ?? null
      )
    },
    getAllPermissions: () =>
      get().session?.roles.flatMap((role) =>
        role.permissions.map((rolePermission) => rolePermission.permission)
      ) || [],
    getFullName: () => `${get().session?.name} ${get().session?.surname}`,
    resetSession: () => set({}),
  }))
)
