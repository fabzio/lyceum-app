import ElemCard from '@/components/ElemCard'
import { Course } from '@/interfaces/models/Course'

type Props = Pick<Course, 'code' | 'name' | 'credits'>

export default function CourseCard({ code, name, credits }: Props) {
  return (
    <ElemCard
      title={name}
      badge={code}
      description={credits.toFixed(2) + ' créditos'}
    />
  )
}
