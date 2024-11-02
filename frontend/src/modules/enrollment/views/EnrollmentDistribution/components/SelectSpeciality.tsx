import { Button } from "@frontend/components/ui/button"
import { cn } from "@frontend/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@frontend/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@frontend/components/ui/command"
import React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'


// const carreras = [
//   {
//     value: 1,
//     label: "Ingeniería de Sistemas",
//   },
//   {
//     value: 2,
//     label: "Ingeniería de Software",
//   },
//   {
//     value: 3,
//     label: "Ingeniería de Computación",
//   },
//   {
//     value: 4,
//     label: "Ingeniería de Informática",
//   },
//   {
//     value: 5,
//     label: "Ingeniería de Redes",
//   }
// ]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
