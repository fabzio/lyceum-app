import { useMutation } from '@tanstack/react-query'
import { useToast } from '@frontend/hooks/use-toast'
import { Button } from '@frontend/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import PresentationCardService from '@frontend/modules/student-process/services/presentationCard.service'

interface Props {
  docId: string // Doc ID que proviene de la carta de presentación
  docName?: string // Nombre del documento
  icon?: boolean
  message?: string
}

export default function DownloadDoc({
  docId,
  docName,
  message,
  icon = false,
}: Props) {
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationKey: ['downloadCoverLetterDoc', docId],
    mutationFn: () => PresentationCardService.getDocument(docId),
    onSuccess: ({ file, type }) => {
      const extension = type.split('/')[1]
      const url = window.URL.createObjectURL(new Blob([file]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${docName}.${extension}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  if (icon) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? <Loader2 /> : <Download size={16} />}
      </Button>
    )
  }

  return (
    <Button variant="ghost" onClick={() => mutate()} disabled={isPending}>
      {isPending ? (
        <Loader2 />
      ) : (
        <>
          <Download size={16} className="mr-2" /> {message || 'Descargar'}
        </>
      )}
    </Button>
  )
}
