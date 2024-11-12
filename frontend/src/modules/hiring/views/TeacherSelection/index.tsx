import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import HiringService from '../../Services/Hirings.service'
import { Input } from '@frontend/components/ui/input'
import HiringAccordion from './components/HiringAccordion'

export default function TeacherSelection() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.hiring.HIRINGS],
    queryFn: HiringService.getHirings,
  })
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar asignación" />
        </div>
        <div className="flex gap-2">
          <button>Nueva asignación</button>
        </div>
      </div>
      <div>
        <HiringAccordion hirings={data} />
      </div>
    </div>
  )
}
