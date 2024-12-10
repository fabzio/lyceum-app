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

interface Props {
  asideElements: AsideElement[]
}
export default function AsideDesktop({ asideElements = [] }: Props) {
  const { getAllPermissions } = useSessionStore()
  const navigate = useNavigate()
  return (
    <aside className="[grid-area:aside] flex flex-col shadow-sm">
      <Menubar className="h-full flex flex-col gap-y-8 py-1">
        {asideElements.map((element) => {
          const filteredSubmodules = filterTabs(
            element.submodules,
            getAllPermissions()
          )
          return element.code !== 'HOME' ? (
            <div key={element.code} className="relative">
              <MenubarMenu>
                <MenubarTrigger>{element.icon}</MenubarTrigger>
                <MenubarContent className="absolute left-16 top-[-45px]">
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
            <Link
              key={element.code}
              to={element.path}
              className="w-full rounded-md x-2 flex justify-center hover:bg-muted py-2"
            >
              {element.icon}
            </Link>
          )
        })}
      </Menubar>
    </aside>
  )
}
