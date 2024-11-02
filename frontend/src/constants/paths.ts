import { routeTree } from '@frontend/routeTree.gen'
import { ParseRoute } from '@tanstack/react-router'

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath']
