import Need from '@frontend/components/Need'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'
import CourseProposalTable from './components/CourseProposalTable'
import SearchCourseProposalInput from './components/SearchCourseProposalInput'
import EnrollmentProposalAccordion from '../EnrollmentPropose/components/EnrollmentProposalAccordion'

export default function EnrollmentDistribution() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchCourseProposalInput />
      </div>
      {/* TODO: Agregar permisos */}
      <Need permissions={[UserPermissionsDict.READ_STUDENTS]}>
        <CourseProposalTable />
        <EnrollmentProposalAccordion />
      </Need>
    </div>
  )
}
