import { Input } from '@frontend/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'

import NewPresentationCardButton from './components/NewPresentationCardButton'
import PresentationCardsList from './components/PresentationCardsList'
import PresentationCardService from '../../services/presentationCard.service'
import { useSessionStore } from '@frontend/store'

export default function PresentationCardsOverview() {
  //LETTER: Implementar permisos para visualizar la lista de cartas de presentacion
  // const { session, getRoleWithPermission, havePermission } = useSessionStore()
  const { session } = useSessionStore()
  // const specialtiyId = getRoleWithPermission(
  //   ThesisPermissionsDict.APROVE_THESIS_PHASE_3
  // )?.unitId
  // const areaId = getRoleWithPermission(
  //   ThesisPermissionsDict.APROVE_THESIS_PHASE_2
  // )?.unitId

  const accountCode = session!.code
  const { data: presentationCardRequests } = useSuspenseQuery({
    queryKey: [QueryKeys.presentationCards.PRESENTATION_LETTERS_REQUESTS],
    queryFn: () => {
      return PresentationCardService.getPresentationCardRequests({
        accountCode,
      })
    },
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <NewPresentationCardButton />
      </div>
      <PresentationCardsList
        presentationCardRequests={presentationCardRequests}
      />
    </div>
  )
}
