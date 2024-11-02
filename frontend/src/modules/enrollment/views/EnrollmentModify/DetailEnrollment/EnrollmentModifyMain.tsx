import { Badge } from '@frontend/components/ui/badge'
import { Button } from '@frontend/components/ui/button'
import { Input } from '@frontend/components/ui/input'
import { Label } from '@frontend/components/ui/label'
import { Separator } from '@frontend/components/ui/separator'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import {
  mapEnrollmentModifyRequestType,
  mapEnrollmentModifyState,
} from '@frontend/modules/enrollment/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import ConfirmResponseDialog from './components/ConfirmResponseDialog'

export default function EnrollmentModifyMain() {
  const { requestNumber } = useParams({
    from: '/_auth/matricula/modificacion-matricula/$requestNumber',
  })
  const { data: enrollmentModifyRequest } = useSuspenseQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY_DETAIL, requestNumber],
    queryFn: () =>
      EnrollmentService.getEnrollment({ requestId: +requestNumber }),
  })
  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 h-10 w-full p-2 justify-between">
          <h1 className="text-xl font-bold">
            Solicitud N°: {enrollmentModifyRequest.requestNumber}
          </h1>
          <Badge>
            {mapEnrollmentModifyState[enrollmentModifyRequest.state]}
          </Badge>
        </div>
      </div>
      <Separator />
      <section className="px-10">
        <div className="flex flex-col gap-2">
          <div className="space-y-1.5">
            <Label>Curso</Label>
            <div className="flex gap-2">
              <span>
                <Input
                  readOnly
                  value={enrollmentModifyRequest.schedule.courseCode}
                />
              </span>
              <span className="flex-grow">
                <Input
                  readOnly
                  value={enrollmentModifyRequest.schedule.courseName}
                />
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1.5">
              <Label>Tipo de Solicitud</Label>
              <Input
                readOnly
                value={
                  mapEnrollmentModifyRequestType[
                    enrollmentModifyRequest.requestType
                  ]
                }
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <Label>Horario</Label>
              <Input readOnly value={enrollmentModifyRequest.schedule.code} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Justificación</Label>
            <Textarea readOnly value={enrollmentModifyRequest.reason} />
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          {enrollmentModifyRequest.state !== 'requested' ? (
            <Button variant="ghost" disabled>
              Esta solicitud ya fue respondida
            </Button>
          ) : (
            <>
              <ConfirmResponseDialog response="denied" />
              <ConfirmResponseDialog response="approved" />
            </>
          )}
        </div>
      </section>
    </div>
  )
}
