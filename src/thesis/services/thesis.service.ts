import http from '@/lib/http'
import { Thesis } from '../interfaces/Thesis'

class ThesisService {
  public static async getTheses(): Promise<Thesis[]> {
    try {
      const res = await http.get('/thesis/theses')
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
      return response.data as Thesis[]
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public static async createThesis(thesis: Omit<Thesis, 'id'>): Promise<void> {
    try {
      const res = await http.post(`/thesis/theses`, {
        ...thesis,
        advisors: thesis.advisors,
        students: thesis.students,
        career: thesis.career,
        concentration: thesis.concentration,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async updateThesis(thesis: Thesis): Promise<void> {
    try {
      const res = await http.put('/thesis/theses', {
        id: thesis.id,
        title: thesis.title,
        area: thesis.area,
        type: thesis.type,
        aprovalDate: thesis.aprovalDate,
        students: thesis.students,
        advisors: thesis.advisors,
        career: thesis.career,
        status: thesis.status,
        concentration: thesis.concentration,
      })
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  public static async deleteThesis(thesisId: Thesis['id']): Promise<void> {
    try {
      const res = await http.delete(`/thesis/theses/${thesisId}`)
      const response = res.data as ResponseAPI
      if (!response.success) {
        throw new Error('Error')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default ThesisService
