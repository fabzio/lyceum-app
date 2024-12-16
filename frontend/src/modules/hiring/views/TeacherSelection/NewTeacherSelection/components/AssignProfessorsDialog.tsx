import { Button } from '@frontend/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@frontend/components/ui/dialog'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import QuickSearchInput from '@frontend/components/QuickSearchInput.tsx/QuickSearchInput'
import AccountsService from '@frontend/service/Accounts.service'
import { BaseRoles } from '@frontend/interfaces/enums/BaseRoles'
import { PlusIcon, X } from 'lucide-react'
import { toast } from '@frontend/hooks/use-toast'

interface Professor {
  accountId: string
  name?: string
  code?: string
}

interface Props {
  professors: Professor[]
  setProfessors: (professors: Professor[]) => void
}

export default function AssignProfessorsDialog({
  professors,
  setProfessors,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogProfessors, setDialogProfessors] =
    useState<Professor[]>(professors)

  const handleAddProfessor = () => {
    setDialogProfessors((prev) => [...prev, { accountId: '' }])
  }

  const handleRemoveProfessor = (index: number) => {
    setDialogProfessors((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSelectProfessor = (index: number, newProfessor: Professor) => {
    setDialogProfessors((prev) =>
      prev.map((prof, i) => (i === index ? newProfessor : prof))
    )
  }

  const handleAssign = () => {
    toast({
      title: 'Comité seleccionado',
      description: `Se seleccionaron ${dialogProfessors.length} profesores.`,
    })
    setProfessors(dialogProfessors)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          // Reset local state to reflect the currently saved professors
          setDialogProfessors(professors)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-full lg:w-auto px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Seleccionar Comité
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Docentes</DialogTitle>
          <DialogDescription>
            Asigna los docentes a los horarios seleccionados, una vez asignado
            el horario
            <span className="font-semibold"> NO podrá ser modificado</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Button size="icon" variant="outline" onClick={handleAddProfessor}>
            <PlusIcon />
          </Button>

          {dialogProfessors.map((prof, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  Docente
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => handleRemoveProfessor(index)}
                  >
                    <X />
                  </Button>
                  <div className="flex-1">
                    <QuickSearchInput
                      placeholder="Buscar profesor por código o nombre"
                      searchFn={(q) => {
                        const accountsResult = AccountsService.getAccount({
                          q,
                          userType: BaseRoles.TEACHER,
                        })
                        return accountsResult.then((accounts) =>
                          accounts.map((account) => ({
                            accountId: account.id,
                            name: `${account.name} ${account.firstSurname} ${account.secondSurname}`,
                            code: account.code,
                          }))
                        )
                      }}
                      handleSelect={(item) =>
                        item
                          ? handleSelectProfessor(index, {
                              accountId: item!.accountId,
                              name: item?.name,
                              code: item?.code,
                            })
                          : handleRemoveProfessor(index)
                      }
                      renderOption={(item) => (
                        <div className="hover:bg-muted">{item!.name}</div>
                      )}
                      renderSelected={(item) => (
                        <article>
                          <h5 className="font-semibold">{item!.name}</h5>
                          <p className="text-xs">{item!.code}</p>
                        </article>
                      )}
                      defaultValue={
                        professors.find(
                          (p) => p.accountId === prof.accountId
                        ) || null
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleAssign}
            disabled={dialogProfessors.length === 0}
          >
            Asignar Docentes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
