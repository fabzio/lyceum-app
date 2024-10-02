import { Input } from '@/components/ui/input'
import { IRiskStudent } from '@/interfaces'
import SelectFilter from './SelectFilter'
import TableRiskStudents from './TableRiskStudents'

export default function RiskStudents() {
    return (
      <div className="flex flex-col my-6 p-2">
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <div className="md:flex-grow">
            <Input type="search" placeholder="🔎 Buscar alumno" />
          </div>
          <div className="flex gap-2">
            <SelectFilter />
          </div> 
        </div>
        <div className="flex gap-2">
            <TableRiskStudents tableRiskStudents={ riskStudents }></TableRiskStudents>
        </div>
      </div>
    )
  }
  const riskStudents: IRiskStudent[] = [
    {
      codigo: 1,
      nombres: "Juan",
      apellidos: "Pérez",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "2"
    },
    {
      codigo: 2,
      nombres: "María",
      apellidos: "López",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "3"
    },
    {
      codigo: 3,
      nombres: "Carlos",
      apellidos: "Gómez",
      curso: "Programación 2",
      motivo: "Cuarta",
      ultimaPuntuacion: "2"
    },
    {
      codigo: 4,
      nombres: "Ana",
      apellidos: "Martínez",
      curso: "Programación 2",
      motivo: "Tercera",
      ultimaPuntuacion: "4"
    }
  ]