import { useParams } from '@tanstack/react-router'
import UnitManagement from './components/UnitManagement'
import { ReactNode } from 'react'

interface Unit {
  name: string
  type: string
  description: string
  children: ReactNode
}

export default function Unit() {
  const { name } = useParams({
    from: '/unidad/$name',
  })
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
      </div>
      <section>
        <UnitManagement />
      </section>
    </div>
  )
}
