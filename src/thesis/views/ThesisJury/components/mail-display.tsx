import { Separator } from '@/components/ui/separator'
import { Mail } from '../data'
import ThesisJuryRequestForm from '../ThesisJuryRequestForm'
import { ScrollArea } from '@/components/ui/scroll-area'

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  return (
    <div className=" flex flex-col h-full">
      <div className="flex items-center p-2 h-14">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            {mail
              ? 'Solicitud N°: ' + mail.id.substring(0, 10)
              : 'Nueva solicitud'}
          </h1>
        </div>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col overflow-hidden">
        {mail && (
          <>
            <div className="flex items-start p-4">
              <div className="flex flex-grow justify-between items-start gap-4 text-sm">
                <div className="grid gap-1">
                  {mail?.status === 'pending' ? 'En proceso' : 'Completado'}
                </div>
                <div>
                  {mail?.status === 'pending'
                    ? mail?.approvalHistory.find(
                        (item) => item.status === 'current'
                      )?.step
                    : ''}
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        <div className="overflow-hidden">
          <ScrollArea className="h-full">
            <div className="whitespace-pre-wrap p-4 text-sm">
              <ThesisJuryRequestForm mail={mail} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
