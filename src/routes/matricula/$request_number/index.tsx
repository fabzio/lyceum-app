import DetailEnrollment from '@/enrollment/views/Enrollment/DetailEnrollment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/matricula/$request_number/')({
    /*
    loader: ({ params, context: { queryClient } }) => {
        
        queryClient.ensureQueryData({
            queryKey: ['enrollment', params.request_number],
            queryFn: () => EnrollmentsService.getEnrollment(params.request_number),
        })
        
    }
    */
  component: () => <DetailEnrollment />,
})
