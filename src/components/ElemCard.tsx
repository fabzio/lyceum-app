import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
interface Props {
  title: string
  description: string
  badge: string
}
export default function ElemCard({ title, description, badge }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='text-lg'>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{badge}</Badge>
      </CardContent>
    </Card>
  )
}
