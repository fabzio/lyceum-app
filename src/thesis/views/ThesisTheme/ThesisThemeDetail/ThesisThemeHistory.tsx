import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeStepper from '@/thesis/components/ThesisThemeStepper'
import ThesisThemeRequestService from '@/thesis/services/ThesisThemeRequest.service'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import ThesisThemeReview from '../components/ThesisThemeReview'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ThesisThemeHistory() {
  const { requestCode } = useParams({
    from: '/tesis/tema-tesis/$requestCode',
  })
  const { data: thesisThemeRequestDetails } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUEST_DETAIL, requestCode],
    queryFn: () => ThesisThemeRequestService.getThemeRequestDetail(requestCode),
  })
  const { data: thesisThemeHistory } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUESTS_HISTORY, requestCode],
    queryFn: () =>
      ThesisThemeRequestService.getThemeRequestHistory(requestCode),
  })
  const [thesisThemeRequestDetail] = thesisThemeRequestDetails ?? []
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 h-10 py-2">
          <h1 className="text-xl font-bold">Información Complementaria</h1>
        </div>
      </div>
      <Separator />
      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Información de Ficha</h3>
          <Label>Solicitante</Label>
          <p> {thesisThemeRequestDetail.applicant.name}</p>
          <Label>Concentración</Label>
          <p>{thesisThemeRequestDetail.area}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Historial</h3>
          <ScrollArea className="h-64">
            <ThesisThemeStepper history={thesisThemeHistory} />
          </ScrollArea>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contenido</h3>
          <ThesisThemeReview />
        </div>
      </div>
    </div>
  )
}
