'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MailDisplay } from './mail-display'
import { MailList } from './mail-list'
import { type Mail } from '../data'
import { useMail } from '../use-mail'
import { Button } from '@/components/ui/button'

interface MailProps {
  mails: Mail[]
  defaultLayout: number[] | undefined
}

export function Mail({ mails, defaultLayout = [32, 48] }: MailProps) {
  const [mail] = useMail()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={0}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Jurado de tesis</h1>
              <Button className="ml-auto" variant="outline">
                Nueva solicitud
              </Button>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={15}>Aca debe ir el stepper</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
