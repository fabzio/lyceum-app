import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  useNavigate,
} from '@tanstack/react-router'
import { cleanEmptyParams } from '../modules/study-plans/views/CoursesManagment/utils/cleanEmptyParams'

export function useFilters<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T
) {
  const routeApi = getRouteApi<T>(routeId)
  const navigate = useNavigate()
  const filters = routeApi.useSearch()

  const setFilters = (partialFilters: Partial<typeof filters>) =>
    navigate({
      //@ts-ignore
      search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters }),
      replace: true,
    })
  const resetFilters = () =>
    navigate({
      //@ts-ignore
      search: {},
      replace: true,
    })

  return { filters, setFilters, resetFilters }
}
