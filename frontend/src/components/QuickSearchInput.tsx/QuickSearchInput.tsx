import { useMutation } from '@tanstack/react-query'
import { Input } from '../ui/input'
import debounce from 'debounce'
import { Loader2, X } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useState, useRef, useEffect } from 'react'
import { ScrollArea } from '../ui/scroll-area'

interface Props<T> {
  placeholder?: string
  searchFn: (q: string) => Promise<T[]>
  handleSelect: (value: T | null) => void
  renderOption: (item: T) => React.ReactNode
  renderSelected: (item: T) => React.ReactNode
  className?: string
  defaultValue?: keyof T
  notKeepSelected?: boolean
}

export default function QuickSearchInput<T>({
  handleSelect,
  searchFn,
  placeholder,
  renderOption,
  renderSelected,
  className,
  notKeepSelected = false,
}: Props<T>) {
  const [item, setItem] = useState<T | null>(null)
  const [inputValue, setInputValue] = useState<string>('') // Estado para el valor del input
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationFn: searchFn,
  })

  const onSelect = (item: T) => {
    if (!notKeepSelected) {
      setItem(item)
    } else {
      setInputValue('') // Limpia el input si no se mantiene la selección
    }
    setIsOpen(false)
    handleSelect(item)
  }

  const onRemove = () => {
    setItem(null)
    setInputValue('')
    setIsOpen(false)
    handleSelect(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || ''
    setInputValue(query) // Actualiza el estado del input inmediatamente
    debouncedSearch(query) // Ejecuta la búsqueda con retraso
  }

  // Función de búsqueda con debounce aplicada
  const debouncedSearch = debounce((query: string) => {
    mutate(query)
    setIsOpen(true) // Abre la lista al empezar a escribir
  }, 300)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false) // Cierra la lista si haces clic fuera del contenedor
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {item ? (
        <Card className="p-2 flex items-center justify-between">
          {renderSelected(item)}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove()}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear selection</span>
          </Button>
        </Card>
      ) : (
        <Input
          onChange={handleInputChange} // Usa la función sin debounce para actualizar el input
          value={inputValue} // Asigna el valor del input desde el estado
          placeholder={placeholder}
          type="search"
        />
      )}
      <div className="absolute">
        {isOpen && !item && (
          <ScrollArea className="max-h-52 z-10 w-full mt-1 border rounded-md bg-background flex-col">
            <ul>
              {isPending && (
                <li className="max-w-full py-1 pl-4 text-sm hover:bg-muted rounded-sm px-1">
                  <Loader2 className="animate-spin" />
                </li>
              )}
              {isSuccess &&
                data?.map((item: T, idx) => (
                  <li
                    key={idx}
                    className="w-full py-1 pl-4 text-sm hover:bg-muted rounded-sm mx-1"
                    onClick={() => onSelect(item)}
                  >
                    {renderOption(item)}
                  </li>
                ))}
            </ul>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
