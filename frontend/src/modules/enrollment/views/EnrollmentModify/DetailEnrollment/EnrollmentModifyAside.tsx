import ExpandibleAsidebar from '@frontend/components/ExpandibleAsidebar'
import { Button } from '@frontend/components/ui/button'
import { Input } from '@frontend/components/ui/input'
import { QueryKeys } from '@frontend/constants/queryKeys'
import EnrollmentService from '@frontend/modules/enrollment/services/enrollment.service'
import { useQuery } from '@tanstack/react-query'
import { ListFilter } from 'lucide-react'

export default function EnrollmentModifyAside() {
  const { data: list } = useQuery({
    queryKey: [QueryKeys.enrollment.ENROLLMENTS_MODIFY],
    queryFn: () => EnrollmentService.getAllEnrollments(),
  })
  return (
    <ExpandibleAsidebar>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative flex flex-row space-x-2">
          <div className="flex-grow">
            <Input placeholder="🔎 Buscar" />
          </div>
          <Button variant="ghost">
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>

        <ul>
          {list?.map((enrollment) => (
            <li key={enrollment.requestNumber}>
              {<pre>{JSON.stringify(enrollment, null, 2)}</pre>}
            </li>
          ))}
        </ul>
      </div>
    </ExpandibleAsidebar>
  )
}
