import EnrollmentProposeTable from './components/EnrollmentProposeTable'
import NewEnrollmentPropose from './components/NewEnrollmentPropose'
import SpecilitySelector from './components/SpecilitySelector'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'

export default function EnrollmentPropose() {
  return (
    <div>
      <Need permissions={EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL}>
        <div className="flex justify-between">
          <div>
            <SpecilitySelector />
          </div>
          <NewEnrollmentPropose />
        </div>
      </Need>
      <Need
        some
        permissions={[
          EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL,
          EnrollmentPermissionsDict.MANAGE_SCHEDULE_PROPOSAL,
        ]}
      >
        <EnrollmentProposeTable />
      </Need>
    </div>
  )
}
