import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { QueryKeys } from '@frontend/constants/queryKeys'
import { useToast } from '@frontend/hooks/use-toast'
import RolePermissionService from '@frontend/modules/security/services/role-permission.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Props {
  roleId: number
}
export default function RemoveConfirmationDialog({ roleId }: Props) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => RolePermissionService.deleteRolePermission(roleId),
    onError: ({ message }) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Rol eliminado',
        description: 'El rol ha sido eliminado exitosamente',
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_PERMISSIONS],
      })
      setIsOpen(false)
    },
  })
  const handleDelete = () => {
    mutate()
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2" size="icon" variant="ghost">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar rol</DialogTitle>
          <DialogDescription>
            Se eliminará el rol y todas las asignaciones de las cuentas que lo
            tengan. ¿Desear continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
