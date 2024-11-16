import ExpandibleAsidebar from '@frontend/components/ExpandibleAsidebar'
import { Badge } from '@frontend/components/ui/badge'
import { Button } from '@frontend/components/ui/button'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'
import { cn } from '@frontend/lib/utils'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import { useSessionStore } from '@frontend/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ListFilter } from 'lucide-react'
import { mapCoverLetterStatus } from '../../components/columns'

export default function CoverLetterAside() {
  const { session, getRoleWithPermission } = useSessionStore()
  const accountCode = session!.code
  const unitId = getRoleWithPermission(
    StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
  )?.unitId
  const { data: presentationCardRequests } = useQuery({
    queryKey: [QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS],
    queryFn: unitId
      ? () =>
          PresentationCardService.getPresentationCardRequestsInUnit({
            unitId,
          })
      : () =>
          PresentationCardService.getPresentationCardRequests({
            accountCode: accountCode,
          }),
  })
  const navigate = useNavigate()
  const { requestCode } = useParams({
    from: '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
  }) as { requestCode?: string }
  return (
    <ExpandibleAsidebar>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row space-x-2">
          <Button variant="ghost">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {presentationCardRequests?.map((presentationCardRequest) => (
          <li
            key={presentationCardRequest.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              requestCode === presentationCardRequest.id.toString() &&
                'bg-muted'
            )}
            onClick={() =>
              navigate({
                to: '/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
                params: {
                  requestCode: presentationCardRequest.id.toString(),
                },
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {presentationCardRequest.companyName}
                  </div>
                </div>
              </div>
              <div className="text-sm">
                {presentationCardRequest.name} - {presentationCardRequest.code}
              </div>
            </div>
            <Badge>
              {mapCoverLetterStatus[presentationCardRequest.status]}
            </Badge>
          </li>
        ))}
      </ul>
    </ExpandibleAsidebar>
  )
}
