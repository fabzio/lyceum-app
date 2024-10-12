import NotFound from '@/layouts/NotFound'

export default function ThesisNotFound() {
  return (
    <NotFound
      title="Tesis No Encontrada"
      description="No pudimos encontrar la tesis que estás buscando. Puede que haya sido removida o que no exista."
      backTo="/tesis"
      backToText="Volver a Tesis"
    />
  )
}
