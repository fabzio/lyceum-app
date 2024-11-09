import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { Settings } from 'lucide-react'
import ProposedCourseDetailForm from '../components/ProposalCourseDetail'
import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'

export function CourseActionCell(params: {
  courseName: string
  courseCode: string
  courseId: number
}) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setOpen(false)
  }

  const handleDelete = () => {
    console.log('Deleted course:', params.courseCode)
    setOpen(false)
  }

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
          courseName={params.courseName}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </DialogContent>
    </Dialog>
  )
}
