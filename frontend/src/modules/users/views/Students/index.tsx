import Need from '@frontend/components/Need'
import MasiveStudentsDialog from './components/MasiveStudentsDialog'
import SearchStudentInput from './components/SearchStudentInput'
import StudentTable from './components/StudentTable'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import NewCourseDialog from './components/NewStudentDialog'

export default function StudentManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchStudentInput />

        {/* TODO: Implementar NewStudentDialog*/}
        <Need permissions={[UserPermissionsDict.WRITE_STUDENTS]}>
          <div className="flex gap-2">
            <MasiveStudentsDialog />
            <NewCourseDialog />
          </div>
        </Need>
      </div>
      <Need permissions={[UserPermissionsDict.READ_STUDENTS]}>
        <StudentTable />
      </Need>
    </div>
  )
}
