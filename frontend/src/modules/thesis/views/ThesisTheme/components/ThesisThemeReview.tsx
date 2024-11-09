import { Skeleton } from '@frontend/components/ui/skeleton'
import { Textarea } from '@frontend/components/ui/textarea'
import { QueryKeys } from '@frontend/constants/queryKeys'
import DownloadThesisDoc from '@frontend/modules/thesis/components/DownloadThesisDoc'
import ThesisThemeRequestService from '@frontend/modules/thesis/services/ThesisThemeRequest.service'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearch } from '@tanstack/react-router'
import moment from 'moment'

export default function ThesisThemeReview() {
  const { requestCode } = useParams({
    from: '/_auth/tesis/tema-tesis/$requestCode',
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
      {review?.isFile ? (
        <DownloadThesisDoc
          docId={review?.content}
          docName={`Revisión-${moment(review?.date).format('DD-MM-YYYY HH:mm:ss')}`}
          message="Descargar archivo"
        />
      ) : (
        <Textarea readOnly value={review?.content} />
      )}
    </div>
  )
}
