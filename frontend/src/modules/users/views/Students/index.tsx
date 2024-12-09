import Need from '@frontend/components/Need'
import MasiveStudentsDialog from './components/MasiveStudentsDialog'
import SearchStudentInput from './components/SearchStudentInput'
import StudentTable from './components/StudentTable'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import NewStudentDialog from './components/NewStudentDialog'
import DownloadStudentsReport from './components/StudentsReport'

export default function StudentManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchStudentInput />

        <Need permissions={[UserPermissionsDict.WRITE_STUDENTS]}>
          <div className="flex gap-2">
            <MasiveStudentsDialog />
            <Need permissions={[UserPermissionsDict.READ_STUDENTS]}>
              <DownloadStudentsReport />
            </Need>
            <NewStudentDialog />
          </div>
        </Need>
      </div>
      <Need permissions={[UserPermissionsDict.READ_STUDENTS]}>
        <StudentTable />
      </Need>
    </div>
  )
}
