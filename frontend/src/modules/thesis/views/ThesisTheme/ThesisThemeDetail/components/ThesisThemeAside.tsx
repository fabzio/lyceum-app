import ExpandibleAsidebar from '@frontend/components/ExpandibleAsidebar'
import { Badge } from '@frontend/components/ui/badge'
import { Button } from '@frontend/components/ui/button'
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { ThesisPermissionsDict } from '@frontend/interfaces/enums/permissions/Thesis'
import { cn } from '@frontend/lib/utils'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import { mapStatus } from '@frontend/modules/thesis/utils'
import { useSessionStore } from '@frontend/store'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ListFilter } from 'lucide-react'

export default function ThesisThemeAside() {
  const { session, getRoleWithPermission, havePermission } = useSessionStore()

  const specialtiyId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_3
  )?.unitId
  const areaId = getRoleWithPermission(
    ThesisPermissionsDict.APROVE_THESIS_PHASE_2
  )?.unitId

  const accountCode = session!.code
  const { data: thesisThemeRequests } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUESTS],
    queryFn: specialtiyId
      ? () =>
          ThesisThemeRequestService.getSpecialtyThesisThemeRequest({
            specialtiyId,
          })
      : areaId
        ? () =>
            ThesisThemeRequestService.getAreaThesisThemeRequest({
              areaId: areaId,
            })
        : havePermission(ThesisPermissionsDict.APROVE_THESIS_PHASE_1)
          ? () =>
              ThesisThemeRequestService.getAdvisorThesisThemeRequest({
                advisorCode: accountCode,
              })
          : () =>
              ThesisThemeRequestService.getStudentThesisThemeRequest({
                studentCode: accountCode,
              }),
  })
  const navigate = useNavigate()
  const { requestCode } = useParams({
    from: '/_auth/tesis/tema-tesis/$requestCode',
  }) as { requestCode?: string }
  return (
    <ExpandibleAsidebar>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row space-x-2">
          <div className="flex-grow">
            <Input placeholder="🔎 Buscar" />
          </div>
          <Button variant="ghost">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {thesisThemeRequests?.map((thesisThemeRequest) => (
          <li
            key={thesisThemeRequest.code}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              requestCode === thesisThemeRequest.code && 'bg-muted'
            )}
            onClick={() =>
              navigate({
                to: '/tesis/tema-tesis/$requestCode',
                params: { requestCode: thesisThemeRequest.code },
                search: {
                  historyId: thesisThemeRequest.lastAction.id,
                },
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {thesisThemeRequest.title}
                  </div>
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    requestCode === thesisThemeRequest.code
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                ></div>
              </div>
              <div className="text-sm">{thesisThemeRequest.applicant.name}</div>
            </div>
            <Badge>
              {mapStatus[thesisThemeRequest.lastAction?.action] +
                ' ' +
                thesisThemeRequest.lastAction?.role.toLocaleLowerCase()}
            </Badge>
          </li>
        ))}
      </ul>
    </ExpandibleAsidebar>
  )
}
