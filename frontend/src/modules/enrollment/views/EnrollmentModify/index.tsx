//import { Input } from '@frontend/components/ui/input'
import TableEnrollments from './TableEnrollments'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import NewEnrollmentModification from './components/NewEnrollmentModification'
import SearchEnrollmentInput from './SearchEnrollmentInput'
import StateFilter from './SelectFilter'
import DownloadPDF from './DownloadPDF'

export default function EnrollmentModify() {
  return (
    <div className="flex flex-col my-6 p-4 rounded-lg shadow-md">
      <Need
        some
        permissions={[
          EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT,
          EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT,
        ]}
      >
        <div className="flex gap-2">
          <SearchEnrollmentInput />
          <StateFilter />
          <Need
            permissions={EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT}
          >
            <DownloadPDF />
          </Need>
          <Need
            permissions={EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT}
          >
            <NewEnrollmentModification />
          </Need>
        </div>
      </Need>
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
