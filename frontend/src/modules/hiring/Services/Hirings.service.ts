import { Hiring } from '@frontend/interfaces/models/Hiring'
import http from '@frontend/lib/http'
import axios from 'axios'
import { CreateTeacherSelectionForm } from '../views/TeacherSelection/NewTeacherSelection/components/TeacherSelectionForm'
import { Filters } from '@frontend/interfaces/types'
import { Account } from '@frontend/interfaces/models/Account'
import { JobApplication } from '@frontend/interfaces/models/JobApplication'

class HiringService {
  public static async createTeacherSelection(
    data: CreateTeacherSelectionForm & {
      unitId: number
    }
  ) {
    try {
      const res = await http.post('/hiring/selection', data)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
  public static async getHirings(
    filters: Filters & { unitId: number }
  ): Promise<Hiring[]> {
    try {
      const res = await http.get('/hiring/selection', {
        params: filters,
      })
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Hiring[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getApplicants(
    hiringId: string,
    courseHiringId: string,
    step: 'first' | 'second' | 'selected'
  ): Promise<
    (Pick<Account, 'id' | 'name' | 'email'> & {
      jobRequestStatus: JobApplication['state']
      jobRequestId: JobApplication['id']
    })[]
  > {
    try {
      const res = await http.get(
        `/hiring/selection/${hiringId}/${courseHiringId}/`,
        {
          params: { step },
        }
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as (Pick<Account, 'id' | 'name' | 'email'> & {
        jobRequestStatus: JobApplication['state']
        jobRequestId: JobApplication['id']
      })[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getMotivation(
    id: string,
    hiringId?: string,
    courseHiringId?: string,
    accountId?: string
  ): Promise<string | null> {
    try {
      const res = await http.get(
        `/hiring/selection/${hiringId}/${courseHiringId}/${accountId}/motivation`,
        {
          params: { id },
        }
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<string | null>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default HiringService
