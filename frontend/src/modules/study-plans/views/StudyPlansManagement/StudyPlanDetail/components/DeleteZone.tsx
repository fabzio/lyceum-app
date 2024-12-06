import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDroppable } from '@dnd-kit/core'

interface Props {
  over: boolean
}

export default function DeleteZone({ over }: Props) {
  const { setNodeRef: dropRef } = useDroppable({
    id: 'delete-zone',
  })

  return (
    <motion.section
      className="absolute w-full flex justify-center z-50"
      initial={{ y: '-100%' }}
      animate={{ y: over ? '0%' : '-150%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative" ref={dropRef}>
        <div className="rounded-full p-4 bg-red-700 z-50">
          <Trash2 size={48} color="white" />
        </div>
      </div>
    </motion.section>
  )
}
