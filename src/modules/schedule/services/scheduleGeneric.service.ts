import db from '@/database'
import {
  schedules
} from '@/database/schema'
import { eq} from 'drizzle-orm'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO'
class ScheduleGenericService implements ScheduleGenericDAO {
  public async fetchSchedulesByCourse(courseId: number) {
    // Validación 1: Verifica que el courseId no sea nulo o indefinido
    if (!courseId) {
        throw new Error('courseId es obligatorio');
    }
    // Consultamos los horarios asociados al curso
    const courseSchedules = await db
        .select({
            id: schedules.id,
            code: schedules.code,
            termId: schedules.termId,
            state: schedules.state,
            visibility: schedules.visibility
        })
        .from(schedules)
        .where(eq(schedules.courseId, courseId));
    // Validación 2: Verifica si se encontraron horarios
    if (courseSchedules.length === 0) {
        throw new Error('No se encontraron horarios para el curso especificado');
    }
    return courseSchedules;
  }
}
export default ScheduleGenericService