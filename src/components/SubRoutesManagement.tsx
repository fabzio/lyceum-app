import { Outlet, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ValidRoutes } from '@/constants/paths'
import { useTabs } from '@/hooks/useTabs'
import { useSessionStore } from '@/store'
import { filterTabs, Tab } from '@/lib/utils'
import { useEffect } from 'react'

interface Props {
  tabs: Tab[]
}
export default function SubRoutesManagement({ tabs }: Props) {
  const { getAllPermissions } = useSessionStore()
  const { pathname } = useLocation()
  const { activeTab, handleChangeTab } = useTabs(pathname as ValidRoutes)
  const filteredTabs = filterTabs(tabs, getAllPermissions())
  useEffect(() => {
    handleChangeTab(pathname as ValidRoutes)
  }, [pathname, handleChangeTab])
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
