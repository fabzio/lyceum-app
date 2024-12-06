import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { NotepadText } from 'lucide-react'
import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { ViewApplication } from '../components/ApplicationView'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'

export function ViewApplicationCell(params: {
  id: string
  name: string
  email: string
  jobRequestStatus: string
  jobRequestId: number
  courseName: string | undefined
  requirements: HiringRequirement[] | null
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <NotepadText className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="sm:max-w-[425px]">
        <ViewApplication
          application={params}
          handleClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
