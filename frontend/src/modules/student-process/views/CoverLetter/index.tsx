import { Input } from '@frontend/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import { QueryKeys } from '@frontend/constants/queryKeys'

import NewPresentationCardButton from './components/NewPresentationCardButton'
import PresentationCardsList from './components/PresentationCardsList'
import { useSessionStore } from '@frontend/store'
import PresentationCardService from '../../services/presentationCard.service'
import { StudentProcessPermissionsDict } from '@frontend/interfaces/enums/permissions/StudentProcess'

export default function PresentationCardsOverview() {
  const { session, getRoleWithPermission } = useSessionStore()

  const accountCode = session!.code

  const unitId = getRoleWithPermission(
    StudentProcessPermissionsDict.REVIEW_PRESENTATION_LETTER
  )?.unitId
  console.log(unitId)
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
