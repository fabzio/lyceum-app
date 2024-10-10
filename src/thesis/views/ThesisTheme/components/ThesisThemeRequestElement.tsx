import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from '@tanstack/react-router'
import { ThesisThemeRequest } from '@/thesis/interfaces/ThesisThemeRequest'
import moment from 'moment'
import { mapStatus } from '@/thesis/utils'

type Props = ThesisThemeRequest

export default function ThesisThemeElement({
  code,
  applicant,
  date,
  lastAction,
  title,
}: Props) {
  const navigate = useNavigate({
    from: '/tesis',
  })
  const handleChooseCard = () => {
    navigate({
      to: '/tesis/tema-tesis/$requestCode',
      params: { requestCode: code },
      search: {
        historyId: lastAction.id,
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
          {mapStatus[lastAction.action] +
            ' ' +
            lastAction.role.toLocaleLowerCase()}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{applicant.name}</span>
          <span>{moment(date).format('DD/MM/YYYY')}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}
