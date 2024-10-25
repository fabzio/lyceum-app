import { MutationFunction, useMutation } from '@tanstack/react-query'
import { Input } from '../ui/input'
import debounce from 'debounce'
import { Loader2, X } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useState } from 'react'

interface Props<T> {
  placeholder?: string
  searchFn: MutationFunction<T[], string>
  handleSelect: (value: T | null) => void
  renderOption: (item: T) => React.ReactNode
  renderSelected: (item: T) => React.ReactNode
}
export default function QuickSearchInput<T>({
  handleSelect,
  searchFn,
  placeholder,
  renderOption,
  renderSelected,
}: Props<T>) {
  const [item, setItem] = useState<T | null>(null)
  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationFn: searchFn,
  })
  const onSelect = (item: T) => {
    setItem(item)
    handleSelect(item)
  }
  const onRemove = () => {
    setItem(null)
    handleSelect(null)
  }
  const requested = isPending || isSuccess
  const onChangeInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value || ''
    mutate(query)
  }, 300)
  return (
    <div className="relative">
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
          onChange={onChangeInput}
          placeholder={placeholder}
          type="search"
        />
      )}
      {requested && !item && (
        <ul className="absolute z-10 w-full mt-1 border rounded-md max-h-60 overflow-auto bg-primary-foreground">
          {isPending && (
            <li className="w-full grid place-content-center">
              <Loader2 className="animate-spin" />
            </li>
          )}
          {isSuccess &&
            data.map((item: T, idx) => (
              <li key={idx} className="w-full" onClick={() => onSelect(item)}>
                {renderOption(item)}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
