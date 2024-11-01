import { useParams, useSearch } from '@tanstack/react-router'
import ConfirmationDialog from './ConfirmationDialog'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface Props {
  refSubmitButtom: React.RefObject<HTMLButtonElement>
}

export default function ActionButton({ refSubmitButtom }: Props) {
  const { code } = useParams({
    from: '/_auth/usuarios/administativos/$code',
  })
  const { mode } = useSearch({
    from: '/_auth/usuarios/administativos/$code',
  })
  return (
    <div>
      {mode !== 'view' && (
        <ConfirmationDialog refSubmitButtom={refSubmitButtom} />
      )}
      {mode === 'view' && (
        <Link
          to="/usuarios/administativos/$code"
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
