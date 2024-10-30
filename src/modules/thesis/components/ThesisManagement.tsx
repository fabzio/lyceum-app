import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'
import { useTabs } from '@/hooks/useTabs'
import { ThesisPermissionsDict } from '@/interfaces/enums/permissions/Thesis'
import { useSessionStore } from '@/store'
import { filterTabs, Tab } from '@/lib/utils'

export default function TesisManagement() {
  const { getAllPermissions } = useSessionStore()
  const { pathname } = useLocation()
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)
  const filteredTabs = filterTabs(tabs, getAllPermissions())
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleChangeTab}>
        <TabsList>
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
