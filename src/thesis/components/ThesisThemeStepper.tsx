import { CheckCircle, Clock, Download} from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Thesis {
    id: string
    title: string
    area: string
    students: { code: string; name: string }[]
    advisors: { code: string; name: string; isPrincipal: boolean }[]
    status: 'approved' | 'pending'
    fileInfo: {
      requestNumber: string
      name: string
      concentration: string
    }
    approvalHistory: {
      step: string
      status: 'completed' | 'current' | 'pending'
      name: string
      canDownload?: boolean
    }[]
  }

interface Props{
    thesis: Thesis
}

export default function ThesisThemeStepper({thesis}: Props){
    return <>
    {thesis.approvalHistory.map((step, index) => (
        <div key={index} className="flex items-start">
        <div className="mr-4 mt-1">
          {step.status === 'completed' && <CheckCircle size={20} className="text-green-500" />}
          {step.status === 'current' && <Clock size={20} className="text-blue-500" />}
          {step.status === 'pending' && <Clock size={20} className="text-gray-500" />}
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
}