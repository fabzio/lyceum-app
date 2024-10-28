import { Account } from '@/interfaces/models/Account'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ModulesDict } from '@/interfaces/enums/modules'
import { PermissionCode } from '@/interfaces/enums/permissions'

export type Session = {
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
}
type SessionStore = {
  session: Session | null
  syncSession: (session: Session) => void
  getAllowedModules: () => ModulesDict[]
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
    getFullName: () => `${get().session?.name} ${get().session?.surname}`,
    resetSession: () => set({}),
  }))
)
