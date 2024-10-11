//import { Input } from '@/components/ui/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import SelectFilter from './SelectFilter'
import { Button } from '@/components/ui/button'
import EnrollmentService from '@/enrollment/services/enrollment.service'
import TableEnrollments from './TableEnrollments'
import { QueryKeys } from '@/constants/queryKeys'

export default function EnrollmentModify() {
  const { data: enrollments } = useSuspenseQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
    queryFn: () => EnrollmentService.getAllEnrollments(),
  })
  return (
    <div className="flex flex-col my-6 p-4  rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <SelectFilter filterType="ReasonFilter" />
        </div>
        <Button className="w-full md:w-auto">Nueva Solicitud</Button>
      </div>
      <TableEnrollments tableEnrollments={enrollments} />
    </div>
  )
}
