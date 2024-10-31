import { ThesisPermissionsDict } from '@/interfaces/enums/permissions/Thesis'
import { Tab } from '@/lib/utils'
import SubRoutesManagement from '@/components/SubRoutesManagement'

export default function ThesisManagement() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/tesis/tema-tesis',
    label: 'Tema de tesis',
    permissions: [
      ThesisPermissionsDict.APROVE_THESIS_PHASE_1,
      ThesisPermissionsDict.APROVE_THESIS_PHASE_2,
      ThesisPermissionsDict.APROVE_THESIS_PHASE_3,
      ThesisPermissionsDict.CREATE_THESIS,
      ThesisPermissionsDict.READ_THESIS,
    ],
  },
  {
    path: '/tesis/propuesta-jurados',
    label: 'Jurado de tesis',
    permissions: [
      ThesisPermissionsDict.ASSIGN_THESIS_JURY,
      ThesisPermissionsDict.REQUEST_THESIS_JURY,
    ],
  },
]
