// import { Course } from '@frontend/interfaces/models/Course'
import { Filters } from '@frontend/interfaces/types'
// import http from '@frontend/lib/http'
import { CourseProposal } from '../../../interfaces/CourseProposal'
import axios from 'axios'

class CourseProposalService {
  static async fetchCourseProposals(
    filtersAndPagination: Filters
  ): Promise<PaginatedData<CourseProposal>> {
    try {
        //TODO: Poner el endpoint correcto de la distribucion de cursos de la
        // especialidad en cuestion y quitar el mockup
    //   const res = await http.get('/enrollment/', {
    //     params: {
    //       q: filtersAndPagination.q || '',
    //       page: filtersAndPagination.pageIndex || 0,
    //       limit: filtersAndPagination.pageSize || 5,
    //       sortBy: filtersAndPagination.sortBy || 'name.asc',
    //     },
    //   })
    // TODO: Borrar estas dos lineas de abajo porque son solo para que no tire error
      const a = filtersAndPagination
      filtersAndPagination = a

      const res = {
        data: {data:{result: [
            {
              code: "a1b2c3",
              courseId: "CS101",
              courseName: "Introduction to Computer Science",
              vacants: 50,
              visible: 45,
              hidden: 5,
            },
            {
              code: "d4e5f6",
              courseId: "MATH203",
              courseName: "Advanced Calculus",
              vacants: 40,
              visible: 35,
              hidden: 5,
            },
            {
              code: "g7h8i9",
              courseId: "ENG210",
              courseName: "English Literature",
              vacants: 30,
              visible: 25,
              hidden: 5,
            },
            {
              code: "j1k2l3",
              courseId: "PHY101",
              courseName: "Physics I",
              vacants: 45,
              visible: 40,
              hidden: 5,
            },
            {
              code: "m4n5o6",
              courseId: "HIST110",
              courseName: "World History",
              vacants: 25,
              visible: 20,
              hidden: 5,
            }
          ],
    rowCount: 50,
    currentPage: 1,
    totalPages: 1,
    hasNext: false},
message:"mock",
success:true}
      }
      
      const response = res.data as ResponseAPI<PaginatedData<CourseProposal>>
      if (!response.success) {
        throw new Error(response.message)
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || error.message)
      }
      throw error
    }
  }
}
export default CourseProposalService
