import { QueryKeys } from '@frontend/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import HiringService from '../../Services/Hirings.service'
import { Input } from '@frontend/components/ui/input'
import HiringAccordion from './components/HiringAccordion'
import { Link } from '@tanstack/react-router'
import { Button } from '@frontend/components/ui/button'
import { useState } from 'react'
import debounce from 'debounce'

export default function HiringSelection() {
  const { data } = useSuspenseQuery({
    queryKey: [QueryKeys.hiring.HIRINGS],
    queryFn: HiringService.getHirings,
  })

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, 300)

  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input
            type="search"
            placeholder="🔎 Buscar asignación"
            onChange={handleSearch}
          />
        </div>
        <Link to="/contrataciones/seleccion-docentes/nuevo">
          <Button>Nueva convoctoria</Button>
        </Link>
      </div>
      <HiringAccordion hirings={data} searchTerm={searchTerm} />
    </div>
  )
}
