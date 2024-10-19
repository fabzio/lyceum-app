import CourseTable from './components/CourseTable'
import NewCourseDialog from './components/NewCourseDialog'
import MasiveCoursesDialog from './components/MasiveCoursesDialog'
import SearchCourseInput from './components/SearchCourseInput'

export default function CourseManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchCourseInput />

        <div className="flex gap-2">
          <MasiveCoursesDialog />
          <NewCourseDialog />
        </div>
      </div>
      <CourseTable />
    </div>
  )
}
