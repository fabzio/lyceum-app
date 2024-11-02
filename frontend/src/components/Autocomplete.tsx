'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@frontend/components/ui/input'
import { Card } from '@frontend/components/ui/card'
import { Button } from '@frontend/components/ui/button'
import { X } from 'lucide-react'

interface User {
  code: string
  name: string
}

interface AutocompleteProps {
  users: User[]
  children?: React.ReactNode
  placeholder?: string
}

export default function Autocomplete({
  users,
  children,
  placeholder,
}: AutocompleteProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query) {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.code.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredUsers)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, users])

  const handleSelect = (user: User) => {
    setSelectedUser(user)
    setQuery('')
    setIsOpen(false)
  }

  const handleRemove = () => {
    setSelectedUser(null)
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      {selectedUser ? (
        <Card className="p-2 flex items-center justify-between">
          {children}
          <Button variant="ghost" size="sm" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      {isOpen && results.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
          <ul className="py-1">
            {results.map((user) => (
              <li
                key={user.code}
                className="px-4 py-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSelect(user)}
              >
                {user.name} ({user.code})
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
