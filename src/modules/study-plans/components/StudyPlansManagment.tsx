import { Tab } from '@/lib/utils'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'

import SubRoutesManagement from '@/components/SubRoutesManagement'

export default function StudyPlansManagment() {
  return <SubRoutesManagement tabs={tabs} />
}

const tabs: Tab[] = [
  {
    path: '/plan-de-estudios/cursos',
    label: 'Gestión de cursos',
    permissions: [
      StudyPlanPermissionsDict.MANAGE_COURSES,
      StudyPlanPermissionsDict.READ_COURSES,
    ],
  },
  {
    path: '/plan-de-estudios/gestionar',
    label: 'Gestión de plan de estudios',
    permissions: [
      StudyPlanPermissionsDict.MANAGE_STUDY_PLAN,
      StudyPlanPermissionsDict.READ_STUDY_PLAN,
    ],
  },
]
