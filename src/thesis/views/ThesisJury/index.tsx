import { Input } from '@/components/ui/input'
import ThesisJuryRequestSelectFilter from './ThesisJuryRequestFilter'
//import { ThesisJuryRequest } from '@/interfaces/ThesisJuryRequest'

export default function ThesisJuryRequestList() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex flex-col md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar asignación" />
        </div>
        <div className="flex gap-2">
          <ThesisJuryRequestSelectFilter />
        </div>
      </div>
      <div></div>
    </div>
  )
}

// const thesisjuryrequests: ThesisJuryRequest[] = [
//   {
//     student: 'Estudiante 1',
//     thesis: {
//       title: 'Estudio del agua en la ciudad de México',
//     },
//     jury: ['Jurado 1'],
//     status: 'El director debe proponer jurados',
//   },
//   {
//     student: 'Estudiante 2',
//     thesis: {
//       title: 'Estudio del agua en la ciudad de México',
//     },
//     jury: ['Jurado 1'],
//     status: 'El director debe proponer jurados',
//   },
// ]
