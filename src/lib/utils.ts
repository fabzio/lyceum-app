import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Papa from 'papaparse'
import { ValidRoutes } from '@/constants/paths'
import { PermissionCode } from '@/interfaces/enums/permissions'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (str: string | undefined, mode?: 'all'): string => {
  if (!str) return ''
  return mode === 'all'
    ? str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : str.charAt(0).toUpperCase() + str.slice(1)
}

export const getCsvData = <T>(csv: File): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    Papa.parse<T>(csv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.errors.length) {
          reject(new Error('Error parsing CSV'))
        } else {
          resolve(result.data)
        }
      },
    })
  })
}

export type Tab = {
  path: ValidRoutes
  label: string
  permissions: PermissionCode[]
}
export const filterTabs = (
  tabs: Tab[],
  sessionPermissions: PermissionCode[]
) => {
  return tabs.filter((tab) => {
    if (!tab.permissions || tab.permissions.length === 0) return true
    return tab.permissions.some((permission) =>
      sessionPermissions.includes(permission)
    )
  })
}

export const haveSomePermission = (
  sessionPermissions: PermissionCode[],
  permissions: PermissionCode[]
) => {
  return permissions.some((permission) =>
    sessionPermissions.includes(permission)
  )
}
