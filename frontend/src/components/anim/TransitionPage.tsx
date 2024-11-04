import { motion as m } from 'framer-motion'

interface Props {
  children: React.ReactNode
}
export default function TransitionPage({ children }: Props) {
  return (
    <m.main
      className="w-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {children}
    </m.main>
  )
}
