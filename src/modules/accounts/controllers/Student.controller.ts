import { Hono } from 'hono'
import { StudentService } from '../services'

class StudentController {
  private router = new Hono()
  private studentService = new StudentService()

  //TODO Add methods here
}

export default StudentController