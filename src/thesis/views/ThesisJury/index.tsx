import { Input } from '@/components/ui/input'
import ThesisJuryRequestSelectFilter from './ThesisJuryRequestFilter'
import ThesisJuryRequestElement from './ThesisJuryRequestElements'
//import { ThesisJuryRequest } from '@/interfaces/ThesisJuryRequest'

export default function ThesisJuryRequestList() {
  return (
    <div className="flex flex-col my-6 p-2">
      <div className="w-full flex md:flex-row justify-between gap-2">
        <div className="md:flex-grow">
          <Input type="search" placeholder="🔎 Buscar" />
        </div>
        <div className="flex gap-3">
          <ThesisJuryRequestSelectFilter />
        </div>
      </div>  
      <div>
          <ThesisJuryRequestElement id="39457392" 
          title="Solicitud de jurado para tema de tesis para el área de Sistemas de Información"
          owner="Sebastián Meléndez" date="22/09/2024" status= "Solicitud enviada por secretario académico"/>
          
          <ThesisJuryRequestElement id="45612387" 
          title= "Solicitud de jurado para tema de tesis para el área de Ciberseguridad"
          owner="Piero Esparza" date="22/09/2024" status= "Solicitud enviada por secretario académico"/>
      </div>
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
