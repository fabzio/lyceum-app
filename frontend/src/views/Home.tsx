import { useSessionStore } from '@frontend/store'
import { motion } from 'framer-motion'

export default function Home() {
  const { getFullName } = useSessionStore()

  return (
    <div>
      <motion.h2
        className="text-center text-xl flex flex-col"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Le damos la bienvenida a Lyceum
        <motion.span
          className="font-bold text-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {getFullName()}
        </motion.span>
      </motion.h2>
    </div>
  )
}
