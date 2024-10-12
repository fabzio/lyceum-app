import { useEffect, useState } from 'react'
import CourseTable from '@/modules/study-plans/components/CourseTable'
import useCourseStore from '@/modules/study-plans/store/courseManagement/course.store'
import CourseModal from '@/modules/study-plans/components/courseModal'
import { Button } from '@/components/ui/button'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'

export default function CourseManagement() {
  const { courses, fetchCourses, toggleModal, setEditingCourse } =
    useCourseStore()
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 5

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  const totalPages = Math.ceil(courses.length / coursesPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-end items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setEditingCourse(null)
            toggleModal()
          }}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Agregar curso</span>
        </Button>
      </div>
      <CourseTable
        courses={currentCourses}
        onEdit={(course) => {
          setEditingCourse(course)
          toggleModal()
        }}
      />
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <CourseModal />
    </div>
  )
}
