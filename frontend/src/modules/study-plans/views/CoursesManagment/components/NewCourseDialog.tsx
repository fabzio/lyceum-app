import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'

import CourseForm from './CourseForm'
import { useState } from 'react'

export default function NewCourseDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo curso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar curso</DialogTitle>
          <DialogDescription>
            Crea un nuevo curso gestionado por su especialidad
          </DialogDescription>
        </DialogHeader>
        <CourseForm mode="create" handleClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
