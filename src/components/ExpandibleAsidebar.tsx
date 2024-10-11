import { PanelRightClose } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
}
export default function ExpandibleAsidebar({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex h-full">
      <aside
        className={`hidden md:flex flex-col bg-background text-foreground ${isOpen ? 'w-72' : 'w-20'} transition-all duration-300 ease-in-out border-r px-1`}
      >
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <PanelRightClose
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>
        {isOpen ? children : null}
      </aside>
    </div>
  )
}
