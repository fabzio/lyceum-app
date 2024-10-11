import ExpandibleAsidebar from '@/components/ExpandibleAsidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QueryKeys } from '@/constants/queryKeys'
import { cn } from '@/lib/utils'
import ThesisJuryRequestService from '@/thesis/services/thesisJuryRequest.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { mapStatus } from '../components/ThesisJuryRequestElements'

export default function ThesisJuryAside() {
  const { requestCode } = useParams({
    from: '/tesis/propuesta-jurados/$requestCode',
  })
  const { data: thesisRequest } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS],
    queryFn: () => ThesisJuryRequestService.getThesisJuryRequests(),
  })
  return (
    <ExpandibleAsidebar>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row space-x-2">
          <div className="flex-grow">
            <Input placeholder="🔎 Buscar" />
          </div>
          <Button variant="ghost"></Button>
        </div>
      </div>
      <ul className="space-y-2">
        {thesisRequest.map((thesisThemeRequest) => (
          <li
            key={thesisThemeRequest.code}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              requestCode === thesisThemeRequest.code && 'bg-muted'
            )}
          >
            <Link
              to="/tesis/propuesta-jurados/$requestCode"
              params={{
                requestCode: thesisThemeRequest.code,
              }}
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
                <div className="text-sm">
                  {thesisThemeRequest.aplicant.name +
                    ' ' +
                    thesisThemeRequest.aplicant.firstSurname +
                    ' ' +
                    thesisThemeRequest.aplicant.secondSurname}
                </div>
              </div>
              <Badge>{mapStatus[thesisThemeRequest.juryState]}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </ExpandibleAsidebar>
  )
}
