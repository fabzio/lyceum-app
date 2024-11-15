import ExpandibleAsidebar from '@frontend/components/ExpandibleAsidebar'
import { Badge } from '@frontend/components/ui/badge'
import { Button } from '@frontend/components/ui/button'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { cn } from '@frontend/lib/utils'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'
import { useSessionStore } from '@frontend/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ListFilter } from 'lucide-react'

export default function CoverLetterAside() {
  const { session } = useSessionStore()
  const accountCode = session!.code
  const { data: presentationCardRequest } = useQuery({
    queryKey: [QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS],
    queryFn: () =>
      PresentationCardService.getPresentationCardRequests({ accountCode }),
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
        {presentationCardRequest?.map((presentationCardRequest) => (
          <li
            key={presentationCardRequest.presentationCard.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              requestCode === presentationCardRequest.presentationCard.id &&
                'bg-muted'
            )}
            onClick={() =>
              navigate({
                to: '/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
                params: {
                  requestCode: presentationCardRequest.presentationCard.id,
                },
                search: {
                  historyId: presentationCardRequest.lastAction.id,
                },
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {presentationCardRequest.presentationCard.entityName}
                  </div>
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    requestCode ===
                      presentationCardRequest.lastAction.id.toString()
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                ></div>
              </div>
              <div className="text-sm">
                {/* {presentationCardRequest.applicant.name} */}
              </div>
            </div>
            <Badge>
              {/* {mapStatus[presentationCardRequest.lastAction?.action] +
                ' ' +
                presentationCardRequest.lastAction?.role.toLocaleLowerCase()} */}
            </Badge>
          </li>
        ))}
      </ul>
    </ExpandibleAsidebar>
  )
}
