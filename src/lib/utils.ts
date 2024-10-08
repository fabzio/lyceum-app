import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
