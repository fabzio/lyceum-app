export interface Thesis {
    id: string
    title: string
    area: string
    type?: 'individual' | 'group'
    aprovalDate?: string 
    students: { code: string; name: string }[]
    advisors: { code: string; name: string; isPrincipal: boolean }[]
    career?: string
    status: 'approved' | 'pending'
    concentration: string
  }