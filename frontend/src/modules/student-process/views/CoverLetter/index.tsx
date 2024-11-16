import { Input } from '@frontend/components/ui/input'
import NewPresentationCardButton from './components/NewPresentationCardButton'
import CoverLetterTable from './components/PresentationCoverTable'

export default function PresentationCardsOverview() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <NewPresentationCardButton />
      </div>
      <CoverLetterTable />
    </div>
  )
}
