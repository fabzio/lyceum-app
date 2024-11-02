//import { Input } from '@/components/ui/input'
import { Button } from '@frontend/components/ui/button'
import TableEnrollments from './TableEnrollments'
import { useNavigate } from '@tanstack/react-router'
import Need from '@frontend/components/Need'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'

export default function EnrollmentModify() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col my-6 p-4 rounded-lg shadow-md">
      <div className="w-full flex justify-end gap-4 mb-4">
        <Need
          permissions={EnrollmentPermissionsDict.REQUEST_ADITIONAL_ENROLLMENT}
        >
          <Button
            className="w-full md:w-auto"
            onClick={() => navigate({ to: '/matricula/solicitud-matricula' })}
          >
            Nueva Solicitud
          </Button>
        </Need>
      </div>
      <Need permissions={EnrollmentPermissionsDict.REVIEW_ADDITIONAL_ENROLLMENT}>
        <TableEnrollments />
      </Need>
    </div>
  )
}