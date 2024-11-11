import { SearchCourseProposalInput } from '../../EnrollmentDistribution/components/SearchCourseProposalInput'
import Need from '@frontend/components/Need'
import AddCourseDialog from './components/AddCourseDialog'
import CourseProposalTable from './components/CourseProposalTable'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import UpdateStatusDialog from './components/UpdateStatusDialog'
import ProposeHistory from './components/ProposeHistory'

export default function EnrollmentProposeRequest() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchCourseProposalInput />
        <Need permissions={EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL}>
          <AddCourseDialog />
        </Need>
      </div>
      <Need
        some
        permissions={[
          EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
          EnrollmentPermissionsDict.REVIEW_SCHEDULE_PROPOSAL,
        ]}
      >
        <section className="flex gap-2">
          <div className="flex-1">
            <CourseProposalTable />
          </div>
          <div className="flex flex-col items-start gap-3">
            <ProposeHistory />
            <UpdateStatusDialog />
          </div>
        </section>
      </Need>
    </div>
  )
}
