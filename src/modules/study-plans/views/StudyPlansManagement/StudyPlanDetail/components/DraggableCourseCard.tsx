import { Course } from '@/interfaces/models/Course'
import { useDraggable } from '@dnd-kit/core'

interface Props extends Course {
  children: React.ReactNode
}
export default function DraggableCourseCard({
  children,
  name,
  code,
  credits,
}: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: code,
    data: { name, code, credits },
  })
  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={isDragging ? 'invisible' : ''}
    >
      {children}
    </li>
  )
}
