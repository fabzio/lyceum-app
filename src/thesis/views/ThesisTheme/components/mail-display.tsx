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
import { ThesisThemeRequest } from '@/thesis/interfaces/ThesisThemeRequest'
import ThesisThemeRequestForm from './ThesisThemeRequestForm'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useParams } from '@tanstack/react-router'

interface MailDisplayProps {
  mails: ThesisThemeRequest[] | null
}

export function MailDisplay({ mails }: MailDisplayProps) {
  const { idSolicitudTema } = useParams({
    from: '/tesis/tema-tesis/detalle/$idSolicitudTema',
  })
  const mail = mails?.find((item) => item.id === idSolicitudTema)
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
        <ScrollArea>
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm max-w-xl">
            <ThesisThemeRequestForm />
          </div>
        </ScrollArea>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}
