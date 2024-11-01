import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { QueryKeys } from '@/constants/queryKeys'
import RoleAccountsService from '@/modules/security/services/RoleAccounts.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

interface Props {
  accountId: string
  roleId: number
  unitId: number
}
export default function RevokeConfirmationDialog({
  accountId,
  roleId,
  unitId,
}: Props) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: RoleAccountsService.revokeRoleAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.security.ROLE_ACCOUNTS],
      })
    },
  })
  const onRevoke = () => {
    mutate({ accountId, roleId, unitId })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Revocar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revocar asignación de rol</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de revocar la asignación de este rol?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => onRevoke()}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Revocar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
