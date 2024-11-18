import { Button } from '@frontend/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@frontend/components/ui/command'
import { ValidRoutes } from '@frontend/constants/paths'
import Modules from '@frontend/modules'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export default function SearchBar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleClick = (path: ValidRoutes) => {
    navigate({
      to: path,
    })
    setOpen(false)
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <div className="w-64 flex justify-between">
          <span className="text-muted-foreground">🔎 Buscar en Lyceum...</span>{' '}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escriba el módulo o la operación a realizar" />
        <CommandList>
          <CommandEmpty>
            No se encontraron resultados para tu búsqueda
          </CommandEmpty>
          {Modules.map((module) => (
            <CommandGroup key={module.path} heading={module.label}>
              {module.submodules.map((submodule) => (
                <CommandItem
                  key={submodule.path}
                  onSelect={() => handleClick(submodule.path)}
                  className="cursor-pointer"
                >
                  <span className="mr-1">{module.icon}</span>
                  {submodule.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  )
}
