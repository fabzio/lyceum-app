//import { Input } from '@frontend/components/ui/input'
import TableEnrollments from './TableEnrollments'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import NewEnrollmentModification from './components/NewEnrollmentModification'
import SearchEnrollmentInput from './SearchEnrollmentInput'
import StateFilter from './SelectFilter'

export default function EnrollmentModify() {
  return (
    <div className="flex flex-col my-6 p-4 rounded-lg shadow-md">
      <Need
        permissions={EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT}
      >
        <div className="flex gap-2">
          <SearchEnrollmentInput />
          <StateFilter />
        </div>
      </Need>
      <div className="w-full flex justify-end gap-4 mb-4">
        <Need
          permissions={EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT}
        >
          <NewEnrollmentModification />
        </Need>
      </div>
      <Need
        some
        permissions={[
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
          EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
        ]}
      >
        <TableEnrollments />
      </Need>
    </div>
  )
}
