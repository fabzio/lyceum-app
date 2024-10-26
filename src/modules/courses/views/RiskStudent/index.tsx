import SelectFilter from './components/SelectFilter'
import UploadCSVDialog from './components/UploadCSVDialog'
import UpdateConfirmationDialog from './components/UpdateConfirmationDialog'
import RiskStudentTable from './components/RiskStudentTable'
import SearchRiskStudentInput from './components/SearchRiskStudentInput'

export default function RiskStudents() {
  //ANOTACION 1: FALTA FILTRAR POR NOTAS : "Listo Filtrar por Puntacion"
  //ANOTACION 2: REVISANDO TAMBIÉN SERÍA BUENO UN BOTÓN PARA SOLICITAR TODAS LAS ACTUALIZACIONES, EL FIGMA SOLO SOPORTA UNO POR UNO (LUEGO FLORES NOS FUNA)

  return (
    <div className="flex flex-col my-6 p-4  rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <SearchRiskStudentInput />
          <SelectFilter filterType="ReasonFilter" />
          <SelectFilter filterType="ScoreFilter" />
        </div>
        <div className="flex gap-2">
          <UpdateConfirmationDialog />
          <UploadCSVDialog />
        </div>
      </div>
      <RiskStudentTable />
    </div>
  )
}
