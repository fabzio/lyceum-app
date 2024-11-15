import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@frontend/components/ui/card'
import { mapStatus } from '@frontend/modules/thesis/utils'
import { useNavigate } from '@tanstack/react-router'
import { Badge } from '@frontend/components/ui/badge'
import moment from 'moment'
import { PresentationCardRequest } from '@frontend/modules/student-process/interfaces/PresentationCardRequest'

interface ListProps {
  presentationCardRequests?: PresentationCardRequest[]
}
export default function PresentationCardsList({
  presentationCardRequests = [],
}: ListProps) {
  if (presentationCardRequests.length === 0)
    return (
      <p className="text-center py-3">
        No se encontraron solicitudes de cartas de presentacion
      </p>
    )
  console.log(presentationCardRequests)
  return (
    <div>
      {presentationCardRequests?.map((presentationCardRequest) => (
        <PresentationCardElement
          key={presentationCardRequest.presentationCard.id}
          {...presentationCardRequest}
        />
      ))}
    </div>
  )
}

type ElementProps = PresentationCardRequest

function PresentationCardElement({
  presentationCard: { id: code, entityName, createdAt: date, accountIds },
  lastAction,
}: ElementProps) {
  const navigate = useNavigate({
    from: '/procesos-de-estudiantes/cartas-de-presentacion',
  })
  const handleChooseCard = () => {
    navigate({
      to: '/procesos-de-estudiantes/cartas-de-presentacion/$requestCode',
      params: { requestCode: code },
    })
  }
  return (
    <Card className="w-full my-6 p-2 cursor-pointer" onClick={handleChooseCard}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          N°{code}
        </CardTitle>
        <Badge variant="secondary">
          {mapStatus[lastAction.action] +
            ' ' +
            lastAction.role.toLocaleLowerCase()}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">
          {entityName}
        </CardTitle>
        <CardDescription className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{accountIds[0]}</span>
          <span>{moment(date).format('DD/MM/YYYY')}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}
