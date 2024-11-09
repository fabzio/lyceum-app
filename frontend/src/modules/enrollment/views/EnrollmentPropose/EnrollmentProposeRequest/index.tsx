import CourseProposalTable from '../../EnrollmentDistribution/components/CourseProposalTable'
import { SearchCourseProposalInput } from '../../EnrollmentDistribution/components/SearchCourseProposalInput'
import Need from '@frontend/components/Need'
import { UserPermissionsDict } from '@frontend/interfaces/enums/permissions/Users'

export default function EnrollmentProposeRequest() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchCourseProposalInput />
      </div>
      {/* TODO: Agregar permisos */}
      <Need permissions={[UserPermissionsDict.READ_STUDENTS]}>
        <CourseProposalTable />
        {/* <EnrollmentProposalAccordion /> */}
      </Need>
      {/*       <div>
        <AsingProfessorsToCoursesDialog />
      </div> */}
    </div>
  )
}
