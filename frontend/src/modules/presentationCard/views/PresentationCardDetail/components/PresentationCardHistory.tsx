import { Separator } from '@frontend/components/ui/separator'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { ScrollArea } from '@frontend/components/ui/scroll-area'
import PresentationCardService from '@frontend/modules/presentationCard/services/presentationCard.service'
import CardPresentationStepper from './PresentationCardStepper'

export default function ThesisThemeHistory() {
  const { requestCode } = useParams({
    from: '/_auth/carta-de-presentacion/carta/$requestCode',
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
              from="/carta-de-presentacion/carta/$requestCode"
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
