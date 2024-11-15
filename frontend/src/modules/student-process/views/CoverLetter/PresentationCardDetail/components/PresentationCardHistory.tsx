import { Separator } from '@frontend/components/ui/separator'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import CardPresentationStepper from './PresentationCardStepper'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'

export default function CoverLetterHistory() {
  const { requestCode } = useParams({
    from: '/_auth/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
  })
  const { data: presentationCardHistory } = useQuery({
    queryKey: [
      QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS,
      requestCode,
    ],
    queryFn: () =>
      PresentationCardService.getPresentationCardRequests({
        accountCode: requestCode,
      }),
  })
  return (
    <div className="flex h-full flex-col">
      <Separator />
      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Historial</h3>
          <ScrollArea className="h-64">
            <CardPresentationStepper
              history={
                presentationCardHistory?.map(
                  (requestCode) => requestCode.lastAction
                ) || []
              }
              from="/procesos-de-estudiantes/cartas-de-presentacion/$requestCode"
            />
          </ScrollArea>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contenido</h3>
          {/* <ThesisThemeReview /> */}
        </div>
      </div>
    </div>
  )
}
