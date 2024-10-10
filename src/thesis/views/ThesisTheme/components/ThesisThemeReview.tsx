import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { QueryKeys } from '@/constants/queryKeys'
import ThesisThemeRequestService from '@/thesis/services/ThesisThemeRequest.service'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'

export default function ThesisThemeReview() {
  const { requestCode } = useParams({
    from: '/tesis/tema-tesis/$requestCode',
  })
  const { historyId } = useSearch({ strict: false }) as { historyId: string }
  const { data: historyList, isLoading } = useQuery({
    queryKey: [QueryKeys.thesis.THESIS_REQUESTS_HISTORY, requestCode],
    queryFn: () =>
      ThesisThemeRequestService.getThemeRequestHistory(requestCode),
  })

  const review = historyList?.find((item) => item.id === parseInt(historyId))
  if (isLoading) return <Skeleton className="h-20 w-full" />
  return (
    <div>
      <Textarea readOnly value={review?.content} />
    </div>
  )
}
