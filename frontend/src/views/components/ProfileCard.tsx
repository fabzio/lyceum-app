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
        <CardDescription>
          <div>
            <span className="font-semibold"> {baseRole.role}</span>{' '}
            {baseRole.unit}
          </div>
          {session?.email}
          <br /> {session?.code}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
