import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface ErrorPageProps {
  title?: string
  description?: string
  displayErrorMessage?: string
}

export default function ErrorPage({
  title,
  description,
  displayErrorMessage,
}: ErrorPageProps) {
  const router = useRouter()

  const defaultTitle = 'Ocurrió un error'
  const defaultDescription =
    'Lo sentimos, algo salió mal. Por favor, intenta de nuevo más tarde.'
  const defaultOnRetry = () => router.invalidate()

  const displayTitle = title || defaultTitle
  const displayDescription = description || defaultDescription

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-background text-foreground p-4">
      <div className="text-destructive mb-6">
        <AlertCircle size={64} />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">{displayTitle}</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        {displayDescription}
      </p>
      <Button onClick={defaultOnRetry} size="lg">
        Reintentar
      </Button>
      {displayErrorMessage && (
        <HoverCard openDelay={100}>
          <HoverCardTrigger className="mt-4 underline text-muted-foreground">
            Ver detalles
          </HoverCardTrigger>
          <HoverCardContent className="text-destructive">
            <section className="flex gap-2">
              <AlertCircle />
              <span>{displayErrorMessage}</span>
            </section>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  )
}
