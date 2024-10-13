import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { QueryKeys } from '@/constants/queryKeys'
import EnrollmentService from '@/modules/enrollment/services/enrollment.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

export default function EnrollmentModifyAux() {
  const { requestNumber } = useParams({
    from: '/_auth/matricula/modificacion-matricula/$requestNumber',
  })
  const { data: enrollmentModifyRequest } = useSuspenseQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL, requestNumber],
    queryFn: () =>
      EnrollmentService.getEnrollment({ requestId: +requestNumber }),
  })
  const { name, code, faculty, speciality } = enrollmentModifyRequest.student
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 h-10 py-2">
          <h1 className="text-xl font-bold">Datos de Alumno</h1>
        </div>
      </div>
      <Separator />
      <section className="px-5 space-y-2">
        <div>
          <Label>Solicitante</Label>
          <p> {name}</p>
        </div>
        <div>
          <Label>Código</Label>
          <p>{code}</p>
        </div>
        <div>
          <Label>Facultad</Label>
          <p>{faculty}</p>
        </div>
        <div>
          <Label>Especialidad</Label>
          <p>{speciality}</p>
        </div>
      </section>
    </div>
  )
}
