import { ThesisActionsSchema } from '@/database/schema/thesisActions'
import { ThesisDetail } from '../interfaces/ThesisDetail'
import { Account } from '@/interfaces/models/Account'

export interface ThesisThemeDAO {
  getStudentThesisRequests({ studentCode }: { studentCode: string }): Promise<
    {
      code: string
      title: string
      date: Date
      lastAction: {
        id: number
        action: string
        role: string
      }
      applicant: {
        name: string
        code: string
      }
    }[]
  >
  getProfessorThesisRequests({
    professorCode,
  }: {
    professorCode: string
  }): Promise<
    {
      code: string
      title: string
      date: Date
      lastAction: {
        id: number
        action: string
        role: string
      }
      applicant: {
        name: string
        code: string
      }
    }[]
  >

  getAreaThesisRequests({ areaId }: { areaId: number }): Promise<
    {
      code: string
      title: string
      date: Date
      lastAction: {
        id: number
        action: string
        role: string
      }
      applicant: {
        name: string
        code: string
      }
    }[]
  >
  getSpecialityThesisThemeRequest({
    specialityId,
    filter,
  }: {
    specialityId: number
    filter?:
      | 'sended'
      | 'approvedByProfessor'
      | 'approvedByAreaCoordinator'
      | 'approvedByCareerDirector'
  }): Promise<
    {
      code: string
      title: string
      date: Date
      lastAction: {
        id: number
        action: string
        role: string
      }
      applicant: {
        name: string
        code: string
      }
    }[]
  >

  getThesisThemeRequestDetail(params: {
    requestCode: string
  }): Promise<ThesisDetail>

  getThesisActions(params: { requestCode: string }): Promise<
    {
      id: number
      action: string
      date: Date
      content: string
      isFile: boolean
      actor: string
      role: string
    }[]
  >
  insertThemeRequestAction(
    params: Omit<ThesisActionsSchema, 'requestId'> & {
      requestCode: string
    }
  ): Promise<void>
  createThesisThemeRequest(params: {
    title: string
    areaId: number
    applicantCode: string
    advisors: Account['code'][]
    students: Account['code'][]
    justification: string
  }): Promise<{ thesisCode: string; historyId: number }>
}
