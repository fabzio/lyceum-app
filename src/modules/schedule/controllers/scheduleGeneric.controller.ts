import { Hono } from 'hono'
import { LyceumError } from '@/middlewares/errorMiddlewares'
import { ScheduleGenericDAO } from '../dao/scheduleGenericDAO';
import { ScheduleGenericService } from '../services';
class ScheduleGenericController {
  private router = new Hono()
  private enrollmentService: ScheduleGenericDAO =
    new ScheduleGenericService()
    public getSchedulesByCourse = this.router.get(
      '/:courseId',
      //zValidator('json', z.object({ courseId: z.number() })),
      async (c) => {
        const { courseId } = c.req.param();
  
        try {
          const schedules = await this.enrollmentService.fetchSchedulesByCourse(parseInt(courseId));
          
          const response: ResponseAPI = {
            data: schedules,
            message: 'Schedules retrieved successfully',
            success: true,
          };
  
          return c.json(response);
        } catch (error) {
          console.error('Error retrieving schedules:', error);
          if (error instanceof LyceumError) {
            c.status(error.code);
          } else {
            c.status(500); // Internal Server Error
          }
          return c.json({ success: false, message: 'Failed to retrieve schedules' });
        }
      }
    );
}
export default ScheduleGenericController