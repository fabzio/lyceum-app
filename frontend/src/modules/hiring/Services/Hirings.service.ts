import { Hiring } from '@frontend/interfaces/models/Hiring'
import http from '@frontend/lib/http'
import axios from 'axios'
import { CreateTeacherSelectionForm } from '../views/TeacherSelection/NewTeacherSelection/components/TeacherSelectionForm'
import { Filters } from '@frontend/interfaces/types'
import { Account } from '@frontend/interfaces/models/Account'
import { JobApplication } from '@frontend/interfaces/models/JobApplication'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'

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
    courseHiringId: number,
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
        jobObservation: JobApplication['observation']
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
  ): Promise<{ motivation: string | null; observation: string | null }> {
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
      return response.data as Promise<{
        motivation: string | null
        observation: string | null
      }>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getRequirements(
    hiringId: number,
    courseId: number
  ): Promise<HiringRequirement[]> {
    try {
      const res = await http.get(
        `/hiring/selection/${hiringId}/${courseId}/requirements`
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<HiringRequirement[]>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getScores(
    jobRequestId: number
  ): Promise<{ id: string; detail: string; score: number }[]> {
    try {
      const res = await http.get(`/hiring/selection/${jobRequestId}/scores`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<
        { id: string; detail: string; score: number }[]
      >
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async updateApplication(
    data: {
      jobRequestId: number
      observation?: string | undefined
      evaluationList?: {
        courseHiringRequirementId: string
        score?: number | undefined
      }[]
    },
    newStatus: 'sent' | 'rejected' | 'to_evaluate' | 'evaluated' | 'selected'
  ): Promise<void> {
    try {
      const res = await http.put(
        `/hiring/selection/${data.jobRequestId}/status`,
        {
          jobRequestId: data.jobRequestId,
          newStatus: newStatus,
          observation: data.observation,
          evaluationList: data.evaluationList,
        }
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as Promise<void>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }

  public static async getApplicationsFromUser(accountId: string): Promise<
    {
      jobRequestStatus: JobApplication['state']
      courseHiringId: JobApplication['courseHiringId']
    }[]
  > {
    try {
      const res = await http.get(
        `/hiring/selection/${accountId}/applications-list`
      )
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as {
        jobRequestStatus: JobApplication['state']
        courseHiringId: JobApplication['courseHiringId']
      }[]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}

export default HiringService
