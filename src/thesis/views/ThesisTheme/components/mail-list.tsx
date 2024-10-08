import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ThesisThemeRequest } from '@/thesis/Interfaces/ThesisThemeRequest'
import { useMail } from '../use-mail'

interface MailListProps {
  items: ThesisThemeRequest[]
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail()

  return (
    <ScrollArea>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              mail.selected === item.id && 'bg-muted'
            )}
            onClick={() => setMail({ ...mail, selected: item.id })}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.thesis.title}</div>
                  {!item.status && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mail.selected === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                ></div>
              </div>
              <div className="text-sm">{item.thesis.area}</div>
            </div>
            <div className="flex items-center gap-2">
              {item.approvalHistory.map(
                (step) =>
                  step.status === 'current' && (
                    <Badge
                      key={step.step}
                      variant="outline"
                      className={getBadgeVariantFromLabel(step.step)}
                    >
                      {step.step}
                    </Badge>
                  )
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>['className'] {
  if (['Aprobado por Director de Carrera'].includes(label)) {
    return 'bg-blue-100 text-blue-800'
  }

  if (['Aprobado por Coordinador de Área'].includes(label)) {
    return 'bg-blue-100 text-blue-800'
  }

  return 'default'
}
