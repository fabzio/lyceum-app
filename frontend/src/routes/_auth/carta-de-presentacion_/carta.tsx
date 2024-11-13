import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/carta-de-presentacion/carta')({
  component: () => (
    <>
      <div>Hello /_auth/carta-de-presentacion/carta-de-presentacion!</div>
      <Outlet />
    </>
  ),
})
