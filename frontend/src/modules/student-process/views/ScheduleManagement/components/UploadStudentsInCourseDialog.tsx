import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'

import { useState } from 'react'

import UploadCSVDialog from './UploadCSVDialog'

export default function UploadStudentsInCourseDialog({
  courseCode,
}: { courseCode?: string } = {}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Cargar Alumnos al Curso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cargar todos los alumnos del curso</DialogTitle>
          <DialogDescription>(seguir plantilla)</DialogDescription>
        </DialogHeader>

        <UploadCSVDialog courseCode={courseCode} />
      </DialogContent>
    </Dialog>
  )
}
