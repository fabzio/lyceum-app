import Need from '@frontend/components/Need'
import EnrollmentProposalAccordion from './components/EnrollmentProposalAccordion'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'

export default function EnrollmentDistribution() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4"></div>
      <Need
        some
        permissions={[
          EnrollmentPermissionsDict.READ_SCHEDULE_PROFESORS,
          EnrollmentPermissionsDict.ASSIGN_SCHEDULE_PROFESORS,
        ]}
      >
        <EnrollmentProposalAccordion />
      </Need>
    </div>
  )
}
