import DetailEnrollment from '@/enrollment/views/Enrollment/DetailEnrollment'
import { createFileRoute } from '@tanstack/react-router'
import EnrollmentService from '@/enrollment/services/enrollment.service'


export const Route = createFileRoute('/matricula/$request_number/')({
    parseParams: (params) => ({
        request_number: Number(params.request_number),
      }),

    loader: ({ params, context: { queryClient } }) => {

        queryClient.ensureQueryData({
            queryKey: ['enrollment', params.request_number],
            queryFn: () => EnrollmentService.getEnrollment({
                requestId: params.request_number
        }),
        })
        
    },


  component: () => <DetailEnrollment />,

})
