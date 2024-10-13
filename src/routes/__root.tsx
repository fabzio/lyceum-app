import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthContext } from '@/hooks/useAuth'
import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect, useRef } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'

type RouterContext = {
  authenticated: AuthContext
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const routerState = useRouterState()
    const ref = useRef<LoadingBarRef>(null)
    useEffect(() => {
      if (!ref.current) return
      if (routerState.status === 'pending') {
        ref.current.continuousStart()
      } else {
        ref.current.complete()
      }
    }, [routerState.status])

    return (
      <>
        <LoadingBar ref={ref} color="#2998ff" />
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    )
  },
})
