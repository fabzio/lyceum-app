import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/components/ui/select'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useFilters } from '@frontend/hooks/useFilters'
import { EnrollmentPermissionsDict } from '@frontend/interfaces/enums/permissions/Enrollment'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { useSessionStore } from '@frontend/store'
import { useQuery } from '@tanstack/react-query'

export default function SpecilitySelector() {
  const { getRoleWithPermission } = useSessionStore()
  const { filters } = useFilters('/_auth/matricula/propuesta-horarios')
  const { data: specialities } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, filters],
    queryFn: () =>
      EnrollmentProposalService.getAllEnrollmentProposalsRequest({
        unitId: getRoleWithPermission(
          EnrollmentPermissionsDict.REQUEST_SCHEDULE_PROPOSAL
        )!.unitId,
        ...filters,
      }),
  })

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Elegir especialidad" />
      </SelectTrigger>
      <SelectContent>
        {specialities?.result.map(({ speciality }) => (
          <SelectItem key={speciality.id} value={speciality.id.toString()}>
            {speciality.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
