import { QueryKeys } from '@/constants/queryKeys'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import moment from 'moment'
import { useState } from 'react'
import EnrollmentService from '@/enrollment/services/enrollment.service'



import { Button } from '@/components/ui/button'

export default function DetailEnrollment() {

  /*
  const { request_number } = useParams({
    from: '/matricula/$request_number/',
  })

  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  /*
  const { selectedRiskStudent } = useCourseStore()
  if (!selectedRiskStudent) return <p>No se ha seleccionado un estudiante</p>

  const { data: reports } = useSuspenseQuery({
    queryKey: [QueryKeys.courses.RISK_STUDENT_REPORTS, code],
    queryFn: () =>
      RiskStudentService.getRiskStudentReports({
        scheduleId: selectedRiskStudent.schedule.id,
        studentCode: code,
      }),
  })
*/
return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {/* Datos del Alumno */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 pb-2">
          Datos del Alumno
        </h2>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Nombre: </span>
        </p>
      </div>

      {/* Datos del Horario */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 pb-2">
          Datos del Horario
        </h2>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Código Horario: </span>
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Nombre del Curso: </span>
        </p>
      </div>

      {/* Datos de la Solicitud */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 pb-2">
          Datos de la Solicitud
        </h2>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Tipo de Solicitud: </span>
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Número de Solicitud: </span>
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Estado: </span>
        </p>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Razón: </span>
        </p>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <Button
        >
          Rechazar
        </Button>
        <Button
        >
          Aceptar
        </Button>
      </div>
    </div>
  )
}
