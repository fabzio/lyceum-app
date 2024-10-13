import { Input } from '@/components/ui/input'
import ThesisJuryRequestSelectFilter from './components/ThesisJuryRequestFilter'
import ThesisJuryRequestElement from './components/ThesisJuryRequestElements'
import NewJuryRequestDialog from './components/NewJuryRequestDialog'
import { useSuspenseQuery } from '@tanstack/react-query'
import ThesisJuryRequestService from '@/modules/thesis/services/thesisJuryRequest.service'
import { QueryKeys } from '@/constants/queryKeys'

export default function ThesisJuryRequestList() {
  const { data: thesisJuryRequest } = useSuspenseQuery({
    queryKey: [QueryKeys.thesis.THESIS_JURY_REQUESTS],
    queryFn: () => ThesisJuryRequestService.getThesisJuryRequests(),
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisJuryRequestSelectFilter />
        </div>
        <div>
          <NewJuryRequestDialog />
        </div>
      </div>
      {!thesisJuryRequest.length ? (
        <p className="flex justify-center py-3">
          No se encontraron solicitudes de jurados
        </p>
      ) : (
        <div>
          {thesisJuryRequest?.map((juryRequest) => (
            <ThesisJuryRequestElement key={juryRequest.code} {...juryRequest} />
          ))}
        </div>
      )}
    </div>
  )
}
