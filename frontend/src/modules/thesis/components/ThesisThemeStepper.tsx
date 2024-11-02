import { CheckCircle2, CircleX, Download } from 'lucide-react'
import { Button } from '@frontend/components/ui/button'
import { ThesisThemeRequestAction } from '../interfaces/ThesisThemeRequestAction'
import { mapStatus } from '../utils'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@frontend/components/ui/skeleton'
import { ValidRoutes } from '@frontend/constants/paths'

interface Props {
  history?: ThesisThemeRequestAction[]
  from: ValidRoutes
}

export default function ThesisThemeStepper({ history = [], from }: Props) {
  if (!history.length)
    return (
      <div>
        <ol className="flex flex-col gap-1">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-10 py-2" />
          ))}
        </ol>
      </div>
    )

  return (
    <ol>
      {history?.map((step, index) => (
        <li key={index}>
          <Link
            from={from}
            search={{
              historyId: step.id,
            }}
            className="flex items-start relative"
          >
            <div className="mr-4 mt-1 relative">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full ${
                  step.action === 'approved'
                    ? 'bg-green-200'
                    : step.action === 'sended'
                      ? 'bg-blue-200'
                      : 'bg-red-200'
                }`}
              >
                {step.action === 'sended' && (
                  <CheckCircle2 size={24} className="text-blue-500" />
                )}
                {step.action === 'approved' && (
                  <CheckCircle2 size={24} className="text-green-500" />
                )}
                {step.action === 'denied' && (
                  <CircleX size={24} className="text-red-500" />
                )}
              </span>
            </div>
            <div className="ml-6">
              <p className="text-sm font-medium">
                {mapStatus[step.action] + ' ' + step.role.toLowerCase()}
              </p>
              <p className="text-sm text-gray-500">{step.actor}</p>
            </div>
            {step.isFile && (
              <Button variant="ghost" size="sm" className="ml-2">
                <Download size={16} />
              </Button>
            )}
          </Link>
        </li>
      ))}
    </ol>
  )
}
