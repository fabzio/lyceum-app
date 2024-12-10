import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'
import { useSessionStore } from '@frontend/store'

interface Props {
  baseRole: {
    role: string
    unit: string
  }
}
export default function ProfileCard({ baseRole }: Props) {
  const { session } = useSessionStore()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${session?.name} ${session?.surname}`}</CardTitle>
        <CardDescription className="flex flex-col items-center">
          <div className="text-center">
            <span className="font-semibold"> {baseRole.role}</span>{' '}
            {baseRole.unit}
          </div>
          <p>{session?.email}</p>
          <p>{session?.code}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
