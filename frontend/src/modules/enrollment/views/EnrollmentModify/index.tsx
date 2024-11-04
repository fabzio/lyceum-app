//import { Input } from '@frontend/components/ui/input'
import TableEnrollments from './TableEnrollments'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import NewEnrollmentModification from './components/NewEnrollmentModification'

export default function EnrollmentModify() {
  return (
    <div className="flex flex-col my-6 p-4 rounded-lg shadow-md">
      <div className="w-full flex justify-end gap-4 mb-4">
        <Need
          permissions={EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT}
        >
          <NewEnrollmentModification />
        </Need>
      </div>
      <Need
        permissions={[
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_ALL,
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT_MYSELF,
        ]}
        some
      >
        <TableEnrollments />
      </Need>
    </div>
  )
}
