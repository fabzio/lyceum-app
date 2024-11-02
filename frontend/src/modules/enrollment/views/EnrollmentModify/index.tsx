//import { Input } from '@frontend/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import SelectFilter from './SelectFilter'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import TableEnrollments from './TableEnrollments'
import { QueryKeys } from '@frontend/constants/queryKeys'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import NewEnrollmentModification from './components/NewEnrollmentModification'

export default function EnrollmentModify() {
  const { data: enrollments } = useSuspenseQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
    queryFn: () => EnrollmentService.getAllEnrollments(),
  })
  return (
    <div className="flex flex-col my-6 p-4  rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <SelectFilter filterType="ReasonFilter" />
        </div>
        <Need
          permissions={EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT}
        >
          <NewEnrollmentModification />
        </Need>
      </div>
      <Need
        permissions={EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT}
      >
        <TableEnrollments tableEnrollments={enrollments} />
      </Need>
    </div>
  )
}
