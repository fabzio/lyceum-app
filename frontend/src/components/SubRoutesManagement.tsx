import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@frontend/components/ui/tabs'
import { ValidRoutes } from '@frontend/constants/paths'
import { useTabs } from '@frontend/hooks/useTabs'
import { useSessionStore } from '@frontend/store'
import { filterTabs, Tab } from '@frontend/lib/utils'
import { useEffect } from 'react'

interface Props {
  tabs: Tab[]
}
export default function SubRoutesManagement({ tabs }: Props) {
  const { getAllPermissions } = useSessionStore()
  const { pathname, search } = useLocation()
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)
  const filteredTabs = filterTabs(tabs, getAllPermissions())
  useEffect(() => {
    handleChangeTab(pathname as ValidRoutes, search)
  }, [pathname, handleChangeTab, search])
  return (
    <div className="w-full px-5">
      <Tabs
        value={activeTab}
        onValueChange={(value) => handleChangeTab(value, {})}
      >
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
