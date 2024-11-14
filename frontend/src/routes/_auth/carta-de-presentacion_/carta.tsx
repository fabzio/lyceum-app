import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/carta-de-presentacion/carta')({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
