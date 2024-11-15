import { createFileRoute } from '@tanstack/react-router'
//
export const Route = createFileRoute(
  '/_auth/procesos-de-estudiantes/cartas-de-presentacion/nueva-solicitud'
)({
  component: () => (
    <div>Hello /_auth/carta-de-presentacion/nueva-solicitud!</div>
  ),
})
