import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from '@tanstack/react-router'
import ThesisJuryRequest from '@/modules/thesis/interfaces/ThesisJuryRequest'
import moment from 'moment'

type Props = ThesisJuryRequest
export default function ThesisJuryRequestElement({
  aplicant,
  title,
  code,
  date,
  juryState,
}: Props) {
  const navigate = useNavigate({
    from: '/tesis/propuesta-jurados',
  })
  const handleChooseCard = () => {
    navigate({
      to: '/tesis/propuesta-jurados/$requestCode',
      params: {
        requestCode: code,
      },
    })
  }
  return (
    <Card className="w-full my-6 p-2 cursor-pointer" onClick={handleChooseCard}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          N°{code}
        </CardTitle>
        <Badge variant="secondary">
          {juryState ? mapStatus[juryState] : ''}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{aplicant?.name}</span>
          <span>{moment(date).format('DD/MM/YYYY')}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export const mapStatus = {
  ['requested']: 'Solicitud de jurado',
  ['assigned']: 'Jurado asignado',
  ['unassigned']: 'Sin jurado asignado',
}
