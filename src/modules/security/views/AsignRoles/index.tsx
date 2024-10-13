import { Input } from '@/components/ui/input'
import AssigmentAccordion from './components/AssigmentAccordion'
import SelectFilter from './components/SelectFilter'
import { Assigment } from '@/interfaces'
import NewAssigment from './components/NewAssigment'


export default function AsignRoles() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar asignación" />
        </div>
        <div className="flex gap-2">
          <SelectFilter />
          <NewAssigment />
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
