import { AuthContext } from '@/hooks/useAuth'
import {
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router'
import { Suspense } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { TanStackRouterDevtools } from '@/components/TanstackRouterDevtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoadingBarProvider from '@/layouts/LoadingBarProvider'

type RouterContext = {
  auth: AuthContext
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
