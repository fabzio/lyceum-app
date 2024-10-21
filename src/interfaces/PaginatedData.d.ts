export interface PaginatedData<T> {
  result: T[]
  rowCount: number
  currentPage: number
  totalPages: number
  hasNext: boolean
}
