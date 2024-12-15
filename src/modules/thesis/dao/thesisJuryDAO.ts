import { Account } from '@/interfaces/models/Account'

export interface ThesisJuryDAO {
  startJuryRequest(params: { requestCode: string }): Promise<void>
  getThesisJuryRequests(
    unitID: number,
    filter?: 'unassigned' | 'requested' | 'assigned'
  ): Promise<
    {
      code: string
      title: string
      date: Date
      aplicant: {
        name: string
        firstSurname: string
        secondSurname: string
      }
      juryState: string
    }[]
  >
  getThesisJuries(params: { requestCode: string }): Promise<
    {
      code: string
      name: string
    }[]
  >
  insertThesisJuries(params: {
    thesisCode: string
    listAccountCode: Account['code'][]
  }): Promise<void>
  getThesisByStudentCode(params: { studentCode: string }): Promise<any>
}
