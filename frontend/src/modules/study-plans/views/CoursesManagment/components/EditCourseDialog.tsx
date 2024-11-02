import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@frontend/components/ui/dialog'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  children: React.ReactNode
}
export default function EditCourseDialog({
  isOpen,
  setIsOpen,
  children,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar curso</DialogTitle>
          <DialogDescription>Modifica los datos del curso</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
