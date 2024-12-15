import { useParams, useSearch } from '@tanstack/react-router'
import ConfirmationDialog from './ConfirmationDialog'
import { Link } from '@tanstack/react-router'
import { Button } from '@frontend/components/ui/button'
import RegeneratePasswordDialog from '@frontend/modules/users/components/RegeneratePasswordDialog'

interface Props {
  refSubmitButtom: React.RefObject<HTMLButtonElement>
}

export default function ActionButton({ refSubmitButtom }: Props) {
  const { code } = useParams({
    from: '/_auth/usuarios/administrativos/$code',
  })
  const { mode } = useSearch({
    from: '/_auth/usuarios/administrativos/$code',
  })
  return (
    <div className="flex justify-end w-full py-2 gap-2">
      <RegeneratePasswordDialog code={code} />
      {mode !== 'view' && (
        <ConfirmationDialog refSubmitButtom={refSubmitButtom} />
      )}
      {mode === 'view' && (
        <Link
          to="/usuarios/administrativos/$code"
          params={{ code }}
          search={{
            mode: 'edit',
          }}
        >
          <Button> Editar </Button>
        </Link>
      )}
    </div>
  )
}
