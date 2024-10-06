import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Mail } from '../data'
import { useMail } from '../use-mail'

interface MailListProps {
  items: Mail[]
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
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
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
              <div className="text-xs font-medium">{item.id}</div>
            </div>
            <div className="flex items-center gap-2">
              {item.approvalHistory.map(
                (step) =>
                  step.status === 'current' && (
                    <Badge
                      key={step.step}
                      variant={getBadgeVariantFromLabel(step.step)}
                      className="bg-blue-100 text-blue-800"
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
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default'
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline'
  }

  return 'default'
}
