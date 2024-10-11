import { Input } from '@/components/ui/input'
import SelectFilter from './SelectFilter'
import TableRiskStudents from './TableRiskStudents'
import { Button } from '@/components/ui/button'
import { useSuspenseQuery } from '@tanstack/react-query'
import RiskStudentService from '@/courses/services/riskStudent.service'
import { QueryKeys } from '@/constants/queryKeys'
import UploadCSVDialog from './components/UploadCSVDialog'

export default function RiskStudents() {
  //ANOTACION 1: FALTA FILTRAR POR NOTAS : "Listo Filtrar por Puntacion"
  //ANOTACION 2: REVISANDO TAMBIÉN SERÍA BUENO UN BOTÓN PARA SOLICITAR TODAS LAS ACTUALIZACIONES, EL FIGMA SOLO SOPORTA UNO POR UNO (LUEGO FLORES NOS FUNA)
  const { data: riskStudents } = useSuspenseQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENTS],
    queryFn: RiskStudentService.getRiskStudents,
  })

  return (
    <div className="flex flex-col my-6 p-4  rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="🔎 Buscar alumno"
            className="w-full md:w-2/4"
          />
          <SelectFilter filterType="ReasonFilter" />
          <SelectFilter filterType="ScoreFilter" />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="w-full md:w-auto">
            Solicitar todas las actualizaciones
          </Button>
          <UploadCSVDialog />
        </div>
      </div>
      <TableRiskStudents tableRiskStudents={riskStudents} />
    </div>
  )
}
