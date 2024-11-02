import { AuthContext } from '@frontend/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@frontend/components/ui/toaster'
import { TanStackRouterDevtools } from '@frontend/components/TanstackRouterDevtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoadingBarProvider from '@frontend/layouts/LoadingBarProvider'
import { SessionStore } from '@frontend/store'

type RouterContext = {
  auth: AuthContext
  sessionStore: SessionStore
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <LoadingBarProvider>
        <Outlet />
        <Toaster />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </LoadingBarProvider>
    )
  },
})
