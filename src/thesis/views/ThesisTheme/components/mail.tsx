'use client'

import { Search, ListFilter } from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { MailDisplay } from './mail-display'
import { MailList } from './mail-list'
import { ThesisThemeRequest } from '@/thesis/Interfaces/ThesisThemeRequest'
import { useMail } from '../use-mail'
import { Button } from '@/components/ui/button'
import ThesisThemeStepper from '@/thesis/components/ThesisThemeStepper'

interface MailProps {
  mails: ThesisThemeRequest[]
  defaultLayout: number[] | undefined
}

export function Mail({ mails, defaultLayout = [32, 48] }: MailProps) {
  const [mail] = useMail()

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
          sizes
        )}`
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={0}>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Tema de tesis</h1>
            <Button className="ml-auto" variant="outline">
              Nueva solicitud
            </Button>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative flex flex-row space-x-2">
                <div className="flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar" className="pl-8" />
                </div>
                <Button variant="ghost">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0">
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails.filter((item) => !item.status)} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={0}>
        <MailDisplay
          mail={mails.find((item) => item.id === mail.selected) || null}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={0}>
        <div className="flex h-full flex-col">
          <div className="flex items-center p-2">
            <div className="flex items-center gap-2 h-10 py-2">
              <h1 className="text-xl font-bold">Información Complementaria</h1>
            </div>
          </div>
          <Separator />
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Información de Ficha</h3>
              <p>
                Solicitante:{' '}
                {mails.find((item) => item.id === mail.selected)?.requester}
              </p>
              <p>
                Concentración:{' '}
                {
                  mails.find((item) => item.id === mail.selected)?.thesis
                    .concentration
                }
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Historial</h3>
              <ThesisThemeStepper
                history={
                  mails.find((item) => item.id === mail.selected)
                    ?.approvalHistory
                }
              />
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
