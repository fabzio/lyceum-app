import { Link, useNavigate } from '@tanstack/react-router'
import { AsideElement } from './Aside'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from '@frontend/components/ui/menubar'
import { filterTabs } from '@frontend/lib/utils'
import { useSessionStore } from '@frontend/store'
import { Button } from '@frontend/components/ui/button'

interface Props {
  asideElements: AsideElement[]
}
export default function AsideDesktop({ asideElements = [] }: Props) {
  const { getAllPermissions } = useSessionStore()
  const navigate = useNavigate()
  return (
    <aside className="[grid-area:aside] flex flex-col shadow-sm">
      <Menubar className="h-full flex flex-col gap-y-8 py-2">
        {asideElements.map((element) => {
          const filteredSubmodules = filterTabs(
            element.submodules,
            getAllPermissions()
          )
          return element.moduleCode !== 'HOME' ? (
            <div key={element.moduleCode} className="relative">
              <MenubarMenu>
                <MenubarTrigger>{element.icon}</MenubarTrigger>
                <MenubarContent className="absolute left-16">
                  <MenubarLabel>{element.label}</MenubarLabel>
                  {filteredSubmodules?.map((submodule) => {
                    return (
                      <MenubarItem
                        key={submodule.label}
                        onClick={() =>
                          navigate({
                            to: submodule.path,
                          })
                        }
                      >
                        {submodule.label}
                      </MenubarItem>
                    )
                  })}
                </MenubarContent>
              </MenubarMenu>
            </div>
          ) : (
            <Link key={element.moduleCode} to={element.path}>
              <Button
                className="flex items-center justify-center w-full h-12"
                variant="ghost"
              >
                {element.icon}
              </Button>
            </Link>
          )
        })}
      </Menubar>
    </aside>
  )
}
