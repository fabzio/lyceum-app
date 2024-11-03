import SubRoutesManagement from '@frontend/components/SubRoutesManagement'
import { Tab } from '@frontend/lib/utils'

// this results in for examples/react/kitchen-sink/src/main.ts
export default function UnitManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/unidad/$name/',
    label: 'General',
    permissions: ['TODO_PERMISSION']
  },
  {
    path: '/unidad/$name/subunidades',
    label: 'Subunidades',
    permissions: ['TODO_PERMISSION']
  },
  {
    path: '/unidad/$name/roles',
    label: 'Roles',
    permissions: ['TODO_PERMISSION']
  },
  {
    path: '/unidad/$name/usuarios',
    label: 'Usuarios',
    permissions: ['TODO_PERMISSION']
  },
]
