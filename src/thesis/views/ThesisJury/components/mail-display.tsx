import { MoreVertical } from 'lucide-react'

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Mail } from '../data'
import ThesisJuryRequestForm from './ThesisJuryRequestForm'
import { ScrollArea } from '@radix-ui/react-scroll-area'

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            {mail
              ? 'Solicitud N°: ' + mail.id.substring(0, 10)
              : 'Nueva solicitud'}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex flex-grow justify-between items-start gap-4 text-sm">
              <div className="grid gap-1">En proceso</div>
              <div>Esperando a que el director proponga jurados</div>
            </div>
          </div>
          <Separator />
          <ScrollArea>
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm max-w-xl">
              <ThesisJuryRequestForm />
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}
