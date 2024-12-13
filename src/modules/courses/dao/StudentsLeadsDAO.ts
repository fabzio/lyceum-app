import { Account } from '@/interfaces/models/Account'
import { Unit } from '@/interfaces/models/Unit'
import { PaginatedData } from '@/interfaces/PaginatedData'
import { Course } from '@/interfaces/models/Course'
import { Schedule } from '@/interfaces/models/Schedule'

import { BaseRoles } from '@/interfaces/enums/BaseRoles'
export interface StudentLeadDAO {
  getAllStudentLeadsOfSpeciality: ({
    specialityId,
    q,
    page,
    limit,
    sortBy,
    idTerm,
  }: {
    specialityId: Unit['id']
    q?: string
    page: number
    limit: number
    sortBy?: string
    idTerm?: number
  }) => Promise<{
    result: {
      studentId: Account['id']
      studentFullName: string
      studentCode: Account['code']
      courseId: Course['id']
      courseName: Course['name']
      courseCode: Course['code']
      scheduleId: Schedule['id']
      scheduleCode: Schedule['code']
    }[]
    rowCount: number
    currentPage: number
    totalPages: number
    hasNext: boolean
  }>
}
