import { Button } from '@/components/ui/button'
import { ValidRoutes } from '@/constants/paths'
import { Link } from '@tanstack/react-router'
import { FileSearch } from 'lucide-react'

interface Props {
  title?: string
  description?: string
  backTo?: ValidRoutes
  backToText?: string
}
export default function NotFound({
  backTo = '/',
  backToText = 'Volver al Inicio',
  description,
  title,
}: Props) {
  const defaultTitle = title || 'Recurso no encontrado'
  const defaultDescription =
    description ||
    'Lo sentimos, el recurso que buscas no existe o fue removido.'
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <FileSearch className="h-24 w-24 text-muted-foreground mb-8" />
      <h1 className="text-4xl font-bold mb-2">{defaultTitle}</h1>
      <p className="text-xl text-muted-foreground mb-8">{defaultDescription}</p>
      <Button>
        <Link to={backTo}>{backToText}</Link>
      </Button>
    </div>
  )
}
