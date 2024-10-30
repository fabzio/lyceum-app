import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'
import { useTabs } from '@/hooks/useTabs'
import { filterTabs, Tab } from '@/lib/utils'
import { StudyPlanPermissionsDict } from '@/interfaces/enums/permissions/StudyPlan'
import { useSessionStore } from '@/store'

export default function StudyPlansManagment() {
  const { pathname } = useLocation()
  const { getAllPermissions } = useSessionStore()
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)
  const filteredTabs = filterTabs(tabs, getAllPermissions())
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleChangeTab}>
        <TabsList className="h-full">
          {filteredTabs.map((tab) => (
            <TabsTrigger value={tab.path} key={tab.path}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <section className="mt-2">
          <Outlet />
        </section>
      </Tabs>
    </div>
  )
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
