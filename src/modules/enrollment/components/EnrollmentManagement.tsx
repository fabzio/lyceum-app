import SubRoutesManagement from '@/components/SubRoutesManagement'
import { Tab } from '@/lib/utils'

export default function EnrollmentManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/matricula',
    label: 'Modificación de matrícula',
    permissions: [],
  },
  {
    path: '/matricula/propuesta',
    label: 'Propuesta de matricula',
    permissions: [],
  },
  {
    path: '/matricula/distribucion',
    label: 'Distribución de matricula',
    permissions: [],
  },
]
