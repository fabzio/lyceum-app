import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { CourseProposition } from '@frontend/modules/enrollment/interfaces/CourseProposition'
import ProposedCourseDetailForm from './ProposalCourseDetail'

export function CourseActionCell(params: CourseProposition) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="sm:max-w-[425px]">
        <ProposedCourseDetailForm
          course={params}
          handleClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
