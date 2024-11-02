export interface ScheduleByCourse {
    id: number
    code: string
    termId: number
    state: 'saved' | 'editing'
    visibility: boolean
  }