import { useLocation } from '@tanstack/react-router'

export const useTSRBreadCums = () => {
  const current = useLocation()

  const routeHistory = current.pathname
    .split('/')
    .filter((x) => x && x.length > 0)

  const breadcrumbRoutes = routeHistory.reduce(
    (acc: { name: string; path: string }[], route) => {
      const prev_path = acc[acc.length - 1]?.path ?? ''
      acc.push({ name: route, path: `${prev_path}/${route}` })
      return acc
    },
    []
  )
  return { breadcrumbRoutes }
}
