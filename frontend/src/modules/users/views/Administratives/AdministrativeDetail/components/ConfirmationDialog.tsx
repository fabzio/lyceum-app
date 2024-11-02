import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

interface Props {
  refSubmitButtom: React.RefObject<HTMLButtonElement>
}

export default function ConfirmationDialog({ refSubmitButtom }: Props) {
  const { code } = useParams({
    from: '/_auth/usuarios/administativos/$code',
  })
  const navigate = useNavigate({
    from: '/usuarios/administativos/$code',
  })

  const [isOpen, setIsOpen] = useState(false)
  const { mode } = useSearch({
    from: '/_auth/usuarios/administativos/$code',
  })

  const handleSubmit = () => {
    console.log(mode)
    refSubmitButtom.current?.click()
    navigate({
      to: '/usuarios/administativos/$code',
      params: { code },
      search: { mode: 'view' },
    })
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Guardar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {mode === 'edit' ? 'Actualizar registro' : 'Crear registro'}
        </DialogTitle>
        <DialogDescription>
          ¿Está seguro que desea {mode === 'edit' ? 'actualizar' : 'crear'}
          el registro del profesor?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
