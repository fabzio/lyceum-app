import UnitManagement from './components/UnitManagement'
import { ReactNode } from 'react'
import PageLayout from '@frontend/layouts/PageLayout'

interface Unit {
  name: string
  type: string
  description: string
  children: ReactNode
}

export default function Unit() {
  return (
    <PageLayout name="Unidades">
      <UnitManagement />
    </PageLayout>
  )
}
