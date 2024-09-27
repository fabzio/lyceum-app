import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AssigmentAccordion from './AssigmentAccordion'
import SelectFilter from './SelectFilter'

export default function AsignRoles() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex justify-between">
        <div className="w-fit">
          <Input type="search" placeholder="🔎 Buscar asignación" />
        </div>
        <div className="flex gap-2">
          <SelectFilter />
          <Button>Nueva asignación</Button>
        </div>
      </div>
      <div>
        <AssigmentAccordion assigments={assigments} />
      </div>
    </div>
  )
}
const assigments: Assigment[] = [
  {
    user: 'Fabrizio',
    roles: [
      {
        key: 'Admin',
        value: 'PUCP',
      },
    ],
  },
  {
    user: 'Ricardo',
    roles: [
      {
        key: 'Director de carrera',
        value: 'Ingeniería de Software',
      },
      {
        key: 'Admin',
        value: 'PUCP',
      },
    ],
  },
]
