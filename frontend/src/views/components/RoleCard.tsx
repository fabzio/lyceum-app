import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@frontend/components/ui/card'

interface Props {
  role: string
  unit: string
  editable: boolean
}
export function RoleCard({ role, unit, editable }: Props) {
  if (!editable) return null
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div>
          <CardTitle className="text-base">{role}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  )
}
