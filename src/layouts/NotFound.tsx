import { Button } from '@/components/ui/button'
import { ValidRoutes } from '@/constants/paths'
import { Link } from '@tanstack/react-router'
import { FileSearch } from 'lucide-react'

interface Props {
  title: string
  description: string
  backTo: ValidRoutes
  backToText: string
}
export default function NotFound({
  backTo,
  backToText,
  description,
  title,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <FileSearch className="h-24 w-24 text-muted-foreground mb-8" />
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{description}</p>
      <Button>
        <Link to={backTo}>{backToText}</Link>
      </Button>
    </div>
  )
}
