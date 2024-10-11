import { Hono } from 'hono'
import { CourseDAO } from '../dao/CourseDAO'
import CourseService from '../services/course.service'

class CourseController {
  private router = new Hono()
  private permissionService: CourseDAO = new CourseService()

  public getCourses = this.router.get('/', async (c) => {
    const response: ResponseAPI = {
      data: await this.permissionService.getAllCourses(),
      message: 'Courses retrieved',
      success: true,
    }
    return c.json(response)
  })

  public getCoursesDetail = this.router.get('/:courseId', async (c) => {
    const { courseId } = c.req.param()

    const response: ResponseAPI = {
      data: await this.permissionService.getCoursesDetail({
        courseId: parseInt(courseId!),
      }),
      message: 'Courses retrieved',
      success: true,
    }
    return c.json(response)
  })
}
export default CourseController
