import http from '@frontend/lib/http'
import { ScheduleByCourse } from '@frontend/interfaces/models/ScheduleByCourse'

class ScheduleService {
  public static async getSchedulesByCourse(
    courseId: number
  ): Promise<ScheduleByCourse[]> {
    try {
      // Realizamos la petición GET al endpoint /enrollment/schedules/:courseId
      const res = await http.get(`/schedule/${courseId}`)
      const response = res.data as ResponseAPI

      // Verificamos si la respuesta indica éxito
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data as ScheduleByCourse[] // Asegúrate de que el tipo de respuesta sea el correcto
    } catch (error) {
      console.error('Error fetching schedules:', error)
      throw new Error('Failed to fetch schedules')
    }
  }
  public static async assignJP(
    scheduleId: number,
    accountId: string
  ): Promise<void> {
    try {
      const res = await http.post('/schedule/assign-jp', {
        scheduleId,
        accountId,
      })
      const response = res.data as ResponseAPI

      if (!response.success) {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error('Error assigning JP:', error)
      throw new Error('Failed to assign JP')
    }
  }
}

export default ScheduleService
