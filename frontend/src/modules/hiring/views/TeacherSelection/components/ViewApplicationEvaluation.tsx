import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { Star, Eye } from 'lucide-react'
import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { DoEvaluation, ViewEvaluation } from '../components/ApplicationView'
import { HiringRequirement } from '@frontend/interfaces/models/HiringRequirement'
import { PermissionCode } from '@frontend/interfaces/enums/permissions'

export function ViewEvaluationCell(params: {
  id: string
  name: string
  email: string
  jobRequestStatus: string
  jobRequestId: number
  courseName: string | undefined
  requirements: HiringRequirement[] | null
  edit: boolean
  havePermission?: (permission: PermissionCode) => boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {params.edit ? (
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="sm:max-w-[425px]">
        {params.edit ? (
          <DoEvaluation
            application={params}
            handleClose={() => setOpen(false)}
          />
        ) : (
          <ViewEvaluation
            application={params}
            handleClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
