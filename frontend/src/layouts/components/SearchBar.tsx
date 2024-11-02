import { Button } from '@frontend/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@frontend/components/ui/command'
import { useState } from 'react'

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <div className="w-64 flex justify-between">
          <span className="text-muted-foreground">🔎 Buscar en Lyceum...</span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escribe el módulo o la operación a realizar" />
        <CommandList>
          <CommandEmpty>
            No se encontraron resultados para tu búsqueda
          </CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem>Tesis</CommandItem>
            <CommandItem>Apoyo a matrícula</CommandItem>
            <CommandItem>Procesos de Cursos y Horarios</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
