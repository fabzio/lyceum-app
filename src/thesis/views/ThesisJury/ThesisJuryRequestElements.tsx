import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from '@tanstack/react-router'

interface ProjectCardProps {
  id: string
  title: string
  owner: string
  date: string
  status: string
}

export default function ThesisJuryRequestElement({
  id,
  title,
  owner,
  date,
  status,
}: ProjectCardProps) {
  const navigate = useNavigate({
    from: '/tesis/prop-jurados',
  })
  const handleChooseCard = () => {
    navigate({
      to: '/tesis/prop-jurados/detalle/$idSolicitudJurado',
      params: {
        idSolicitudJurado: id,
      },
    })
  }
  return (
    <Card className="w-full my-6 p-2 cursor-pointer" onClick={handleChooseCard}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          N°{id}
        </CardTitle>
        <Badge variant="secondary">{status}</Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{owner}</span>
          <span>{date}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}
