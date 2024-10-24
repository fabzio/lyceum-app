import { Course } from '@/interfaces/models/Course'
import { useDraggable } from '@dnd-kit/core'

interface Props extends Course {
  children: React.ReactNode
  origin: string
}
export default function DraggableCourseCard({
  children,
  name,
  id,
  code,
  credits,
  origin,
}: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${origin}.${id}`,
    data: { name, code, credits },
  })
  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`list-none ${isDragging ? 'invisible' : ''}`}
    >
      {children}
    </li>
  )
}
