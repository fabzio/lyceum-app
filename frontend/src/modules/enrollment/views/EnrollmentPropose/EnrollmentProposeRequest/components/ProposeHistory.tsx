import { Skeleton } from '@frontend/components/ui/skeleton'
import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentProposalService from '@frontend/modules/enrollment/services/EnrollmentProposal.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'

export default function ProposeHistory() {
  const { requestNumber } = useParams({
    from: '/_auth/matricula/propuesta-horarios/$requestNumber',
  })
  const { data: proposalData, isLoading } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENT_PROPOSALS, +requestNumber],
    queryFn: () =>
      EnrollmentProposalService.getEnrollmentProposalById(+requestNumber),
  })
  return (
    <ol className="flex flex-col gap-4 mb-2">
      {steps.map((step, index) =>
        isLoading ? (
          <Skeleton key={index} className="w-20 h-10" />
        ) : (
          <li key={index} className="relative flex items-center">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full ${
                step.state === proposalData?.state
                  ? 'bg-green-200'
                  : 'bg-gray-200'
              }`}
            ></span>
            <CheckCircle2
              className={`ml-1 z-40 ${
                index === 0 && proposalData?.state === 'requested'
                  ? 'text-green-500'
                  : index === 1 && proposalData?.state === 'sended'
                    ? 'text-green-500'
                    : index === 2 && proposalData?.state === 'aproved'
                      ? 'text-green-500'
                      : 'text-gray-500'
              }`}
            />
            <span className="ml-3 font-semibold">{step.label}</span>
          </li>
        )
      )}
    </ol>
  )
}
const steps = [
  {
    label: 'Solicitud',
    state: 'requested',
  },
  {
    label: 'Propuesta preliminar',
    state: 'sended',
  },
  {
    label: 'Propuesta aprobada',
    state: 'aproved',
  },
]
