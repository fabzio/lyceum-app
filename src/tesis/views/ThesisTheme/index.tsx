import { Input } from '@/components/ui/input'
import AssigmentAccordion from './AssigmentAccordion'
import SelectFilter from './SelectFilter'
import { Assigment } from '@/interfaces'
import NewAssigment from './NewAssigment'


export default function ThesisTheme() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
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
