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
          title="Desarrollo de un Sistema de Gestión de Proyectos Basado en Metodologías Ágiles para Mejorar la Productividad en Equipos de Trabajo Remotos" 
          owner="Sebastián Meléndez" date="22/09/2024" status= "Solicitud enviada por secretario académico"/>
          
          <ThesisJuryRequestElement id="45612387" 
          title="Estudio de las soluciones actuales para la escalabilidad en redes blockchain, como la fragmentación (sharding) y las cadenas laterales (sidechains), y su efectividad en diferentes escenarios." 
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
