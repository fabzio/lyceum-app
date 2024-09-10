import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ValidRoutes } from '@/constants/paths'
import { Link } from '@tanstack/react-router'
import { Book, Home } from 'lucide-react'

type AsideElement = {
  icon: JSX.Element
  path: ValidRoutes
  params?: Record<string, string>
  label: string
}

const asideElements: AsideElement[] = [
  {
    icon: <Home />,
    path: '/',
    label: 'Inicio',
  },
  {
    icon: <Book />,
    path: '/unidad/$name',
    params: { name: 'PUCP' },
    label: 'Unidad',
  },
]

export default function AsideDesktop() {
  return (
    <aside className="[grid-area:aside] flex flex-col shadow-sm">
      <ul className="flex flex-col justify-between gap-5 mt-10">
        <TooltipProvider delayDuration={100}>
          {asideElements.map((item, i) => (
            <li key={i} className="p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    params={item.params}
                    inactiveProps={{
                      className:
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    }}
                    activeProps={{
                      className:
                        'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    }}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </TooltipProvider>
      </ul>
    </aside>
  )
}
