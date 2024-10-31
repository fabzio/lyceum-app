import SubRoutesManagement from '@/components/SubRoutesManagement'
import { Tab } from '@/lib/utils'

export default function StudentProcessManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/cursos',
    label: 'Cartas de Presentación',
    permissions: [],
  },

  {
    path: '/cursos/alumnos-riesgo',
    label: 'Alumnos en Riesgo',
    permissions: [],
  },
  {
    path: '/cursos/retiro-alumnos',
    label: 'Retiro de Alumnos',
    permissions: [],
  },
]
