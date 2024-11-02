import { Filters } from '@frontend/interfaces/types'

export type EnrollmentFilters = Filters & {
  state?: 'requested' | 'approved' | 'denied';
}