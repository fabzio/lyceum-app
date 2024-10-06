import { CheckCircle, Clock, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Step {
  step: string
  status: 'completed' | 'current' | 'pending'
  name: string
  canDownload?: boolean
}

interface Props {
  history: Step[] | undefined
}

export default function ThesisThemeStepper({ history }: Props) {
  return (
    <>
      {history?.map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="mr-4 mt-1">
            {step.status === 'completed' && (
              <CheckCircle size={20} className="text-green-500" />
            )}
            {step.status === 'current' && (
              <Clock size={20} className="text-blue-500" />
            )}
            {step.status === 'pending' && (
              <Clock size={20} className="text-gray-500" />
            )}
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium">{step.step}</p>
            <p className="text-sm text-gray-500">{step.name}</p>
          </div>
          {step.canDownload && (
            <Button variant="ghost" size="sm" className="ml-2">
              <Download size={16} />
            </Button>
          )}
        </div>
      ))}
    </>
  )
}
