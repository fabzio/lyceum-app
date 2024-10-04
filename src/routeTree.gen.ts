/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TesisImport } from './routes/tesis'
import { Route as SeguridadImport } from './routes/seguridad'
import { Route as IndexImport } from './routes/index'
import { Route as SeguridadIndexImport } from './routes/seguridad/index'
import { Route as UnidadNameImport } from './routes/unidad/$name'
import { Route as TesisPropJuradosImport } from './routes/tesis/prop-jurados'
import { Route as SeguridadRolesImport } from './routes/seguridad/roles'
import { Route as SeguridadPermisosImport } from './routes/seguridad/permisos'
import { Route as UnidadNameIndexImport } from './routes/unidad/$name/index'
import { Route as UnidadNameUsuariosImport } from './routes/unidad/$name/usuarios'
import { Route as UnidadNameSubunidadesImport } from './routes/unidad/$name/subunidades'
import { Route as UnidadNameRolesImport } from './routes/unidad/$name/roles'
import { Route as TesisPropJuradosDetalleImport } from './routes/tesis.prop-jurados.detalle'

// Create/Update Routes

const TesisRoute = TesisImport.update({
  path: '/tesis',
  getParentRoute: () => rootRoute,
} as any)

const SeguridadRoute = SeguridadImport.update({
  path: '/seguridad',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SeguridadIndexRoute = SeguridadIndexImport.update({
  path: '/',
  getParentRoute: () => SeguridadRoute,
} as any)

const UnidadNameRoute = UnidadNameImport.update({
  path: '/unidad/$name',
  getParentRoute: () => rootRoute,
} as any)

const TesisPropJuradosRoute = TesisPropJuradosImport.update({
  path: '/prop-jurados',
  getParentRoute: () => TesisRoute,
} as any)

const SeguridadRolesRoute = SeguridadRolesImport.update({
  path: '/roles',
  getParentRoute: () => SeguridadRoute,
} as any)

const SeguridadPermisosRoute = SeguridadPermisosImport.update({
  path: '/permisos',
  getParentRoute: () => SeguridadRoute,
} as any)

const UnidadNameIndexRoute = UnidadNameIndexImport.update({
  path: '/',
  getParentRoute: () => UnidadNameRoute,
} as any)

const UnidadNameUsuariosRoute = UnidadNameUsuariosImport.update({
  path: '/usuarios',
  getParentRoute: () => UnidadNameRoute,
} as any)

const UnidadNameSubunidadesRoute = UnidadNameSubunidadesImport.update({
  path: '/subunidades',
  getParentRoute: () => UnidadNameRoute,
} as any)

const UnidadNameRolesRoute = UnidadNameRolesImport.update({
  path: '/roles',
  getParentRoute: () => UnidadNameRoute,
} as any)

const TesisPropJuradosDetalleRoute = TesisPropJuradosDetalleImport.update({
  path: '/detalle',
  getParentRoute: () => TesisPropJuradosRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/seguridad': {
      id: '/seguridad'
      path: '/seguridad'
      fullPath: '/seguridad'
      preLoaderRoute: typeof SeguridadImport
      parentRoute: typeof rootRoute
    }
    '/tesis': {
      id: '/tesis'
      path: '/tesis'
      fullPath: '/tesis'
      preLoaderRoute: typeof TesisImport
      parentRoute: typeof rootRoute
    }
    '/seguridad/permisos': {
      id: '/seguridad/permisos'
      path: '/permisos'
      fullPath: '/seguridad/permisos'
      preLoaderRoute: typeof SeguridadPermisosImport
      parentRoute: typeof SeguridadImport
    }
    '/seguridad/roles': {
      id: '/seguridad/roles'
      path: '/roles'
      fullPath: '/seguridad/roles'
      preLoaderRoute: typeof SeguridadRolesImport
      parentRoute: typeof SeguridadImport
    }
    '/tesis/prop-jurados': {
      id: '/tesis/prop-jurados'
      path: '/prop-jurados'
      fullPath: '/tesis/prop-jurados'
      preLoaderRoute: typeof TesisPropJuradosImport
      parentRoute: typeof TesisImport
    }
    '/unidad/$name': {
      id: '/unidad/$name'
      path: '/unidad/$name'
      fullPath: '/unidad/$name'
      preLoaderRoute: typeof UnidadNameImport
      parentRoute: typeof rootRoute
    }
    '/seguridad/': {
      id: '/seguridad/'
      path: '/'
      fullPath: '/seguridad/'
      preLoaderRoute: typeof SeguridadIndexImport
      parentRoute: typeof SeguridadImport
    }
    '/tesis/prop-jurados/detalle': {
      id: '/tesis/prop-jurados/detalle'
      path: '/detalle'
      fullPath: '/tesis/prop-jurados/detalle'
      preLoaderRoute: typeof TesisPropJuradosDetalleImport
      parentRoute: typeof TesisPropJuradosImport
    }
    '/unidad/$name/roles': {
      id: '/unidad/$name/roles'
      path: '/roles'
      fullPath: '/unidad/$name/roles'
      preLoaderRoute: typeof UnidadNameRolesImport
      parentRoute: typeof UnidadNameImport
    }
    '/unidad/$name/subunidades': {
      id: '/unidad/$name/subunidades'
      path: '/subunidades'
      fullPath: '/unidad/$name/subunidades'
      preLoaderRoute: typeof UnidadNameSubunidadesImport
      parentRoute: typeof UnidadNameImport
    }
    '/unidad/$name/usuarios': {
      id: '/unidad/$name/usuarios'
      path: '/usuarios'
      fullPath: '/unidad/$name/usuarios'
      preLoaderRoute: typeof UnidadNameUsuariosImport
      parentRoute: typeof UnidadNameImport
    }
    '/unidad/$name/': {
      id: '/unidad/$name/'
      path: '/'
      fullPath: '/unidad/$name/'
      preLoaderRoute: typeof UnidadNameIndexImport
      parentRoute: typeof UnidadNameImport
    }
  }
}

// Create and export the route tree

interface SeguridadRouteChildren {
  SeguridadPermisosRoute: typeof SeguridadPermisosRoute
  SeguridadRolesRoute: typeof SeguridadRolesRoute
  SeguridadIndexRoute: typeof SeguridadIndexRoute
}

const SeguridadRouteChildren: SeguridadRouteChildren = {
  SeguridadPermisosRoute: SeguridadPermisosRoute,
  SeguridadRolesRoute: SeguridadRolesRoute,
  SeguridadIndexRoute: SeguridadIndexRoute,
}

const SeguridadRouteWithChildren = SeguridadRoute._addFileChildren(
  SeguridadRouteChildren,
)

interface TesisPropJuradosRouteChildren {
  TesisPropJuradosDetalleRoute: typeof TesisPropJuradosDetalleRoute
}

const TesisPropJuradosRouteChildren: TesisPropJuradosRouteChildren = {
  TesisPropJuradosDetalleRoute: TesisPropJuradosDetalleRoute,
}

const TesisPropJuradosRouteWithChildren =
  TesisPropJuradosRoute._addFileChildren(TesisPropJuradosRouteChildren)

interface TesisRouteChildren {
  TesisPropJuradosRoute: typeof TesisPropJuradosRouteWithChildren
}

const TesisRouteChildren: TesisRouteChildren = {
  TesisPropJuradosRoute: TesisPropJuradosRouteWithChildren,
}

const TesisRouteWithChildren = TesisRoute._addFileChildren(TesisRouteChildren)

interface UnidadNameRouteChildren {
  UnidadNameRolesRoute: typeof UnidadNameRolesRoute
  UnidadNameSubunidadesRoute: typeof UnidadNameSubunidadesRoute
  UnidadNameUsuariosRoute: typeof UnidadNameUsuariosRoute
  UnidadNameIndexRoute: typeof UnidadNameIndexRoute
}

const UnidadNameRouteChildren: UnidadNameRouteChildren = {
  UnidadNameRolesRoute: UnidadNameRolesRoute,
  UnidadNameSubunidadesRoute: UnidadNameSubunidadesRoute,
  UnidadNameUsuariosRoute: UnidadNameUsuariosRoute,
  UnidadNameIndexRoute: UnidadNameIndexRoute,
}

const UnidadNameRouteWithChildren = UnidadNameRoute._addFileChildren(
  UnidadNameRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/seguridad': typeof SeguridadRouteWithChildren
  '/tesis': typeof TesisRouteWithChildren
  '/seguridad/permisos': typeof SeguridadPermisosRoute
  '/seguridad/roles': typeof SeguridadRolesRoute
  '/tesis/prop-jurados': typeof TesisPropJuradosRouteWithChildren
  '/unidad/$name': typeof UnidadNameRouteWithChildren
  '/seguridad/': typeof SeguridadIndexRoute
  '/tesis/prop-jurados/detalle': typeof TesisPropJuradosDetalleRoute
  '/unidad/$name/roles': typeof UnidadNameRolesRoute
  '/unidad/$name/subunidades': typeof UnidadNameSubunidadesRoute
  '/unidad/$name/usuarios': typeof UnidadNameUsuariosRoute
  '/unidad/$name/': typeof UnidadNameIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/tesis': typeof TesisRouteWithChildren
  '/seguridad/permisos': typeof SeguridadPermisosRoute
  '/seguridad/roles': typeof SeguridadRolesRoute
  '/tesis/prop-jurados': typeof TesisPropJuradosRouteWithChildren
  '/seguridad': typeof SeguridadIndexRoute
  '/tesis/prop-jurados/detalle': typeof TesisPropJuradosDetalleRoute
  '/unidad/$name/roles': typeof UnidadNameRolesRoute
  '/unidad/$name/subunidades': typeof UnidadNameSubunidadesRoute
  '/unidad/$name/usuarios': typeof UnidadNameUsuariosRoute
  '/unidad/$name': typeof UnidadNameIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/seguridad': typeof SeguridadRouteWithChildren
  '/tesis': typeof TesisRouteWithChildren
  '/seguridad/permisos': typeof SeguridadPermisosRoute
  '/seguridad/roles': typeof SeguridadRolesRoute
  '/tesis/prop-jurados': typeof TesisPropJuradosRouteWithChildren
  '/unidad/$name': typeof UnidadNameRouteWithChildren
  '/seguridad/': typeof SeguridadIndexRoute
  '/tesis/prop-jurados/detalle': typeof TesisPropJuradosDetalleRoute
  '/unidad/$name/roles': typeof UnidadNameRolesRoute
  '/unidad/$name/subunidades': typeof UnidadNameSubunidadesRoute
  '/unidad/$name/usuarios': typeof UnidadNameUsuariosRoute
  '/unidad/$name/': typeof UnidadNameIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/seguridad'
    | '/tesis'
    | '/seguridad/permisos'
    | '/seguridad/roles'
    | '/tesis/prop-jurados'
    | '/unidad/$name'
    | '/seguridad/'
    | '/tesis/prop-jurados/detalle'
    | '/unidad/$name/roles'
    | '/unidad/$name/subunidades'
    | '/unidad/$name/usuarios'
    | '/unidad/$name/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/tesis'
    | '/seguridad/permisos'
    | '/seguridad/roles'
    | '/tesis/prop-jurados'
    | '/seguridad'
    | '/tesis/prop-jurados/detalle'
    | '/unidad/$name/roles'
    | '/unidad/$name/subunidades'
    | '/unidad/$name/usuarios'
    | '/unidad/$name'
  id:
    | '__root__'
    | '/'
    | '/seguridad'
    | '/tesis'
    | '/seguridad/permisos'
    | '/seguridad/roles'
    | '/tesis/prop-jurados'
    | '/unidad/$name'
    | '/seguridad/'
    | '/tesis/prop-jurados/detalle'
    | '/unidad/$name/roles'
    | '/unidad/$name/subunidades'
    | '/unidad/$name/usuarios'
    | '/unidad/$name/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SeguridadRoute: typeof SeguridadRouteWithChildren
  TesisRoute: typeof TesisRouteWithChildren
  UnidadNameRoute: typeof UnidadNameRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SeguridadRoute: SeguridadRouteWithChildren,
  TesisRoute: TesisRouteWithChildren,
  UnidadNameRoute: UnidadNameRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/seguridad",
        "/tesis",
        "/unidad/$name"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/seguridad": {
      "filePath": "seguridad.tsx",
      "children": [
        "/seguridad/permisos",
        "/seguridad/roles",
        "/seguridad/"
      ]
    },
    "/tesis": {
      "filePath": "tesis.tsx",
      "children": [
        "/tesis/prop-jurados"
      ]
    },
    "/seguridad/permisos": {
      "filePath": "seguridad/permisos.tsx",
      "parent": "/seguridad"
    },
    "/seguridad/roles": {
      "filePath": "seguridad/roles.tsx",
      "parent": "/seguridad"
    },
    "/tesis/prop-jurados": {
      "filePath": "tesis/prop-jurados.tsx",
      "parent": "/tesis",
      "children": [
        "/tesis/prop-jurados/detalle"
      ]
    },
    "/unidad/$name": {
      "filePath": "unidad/$name.tsx",
      "children": [
        "/unidad/$name/roles",
        "/unidad/$name/subunidades",
        "/unidad/$name/usuarios",
        "/unidad/$name/"
      ]
    },
    "/seguridad/": {
      "filePath": "seguridad/index.tsx",
      "parent": "/seguridad"
    },
    "/tesis/prop-jurados/detalle": {
      "filePath": "tesis.prop-jurados.detalle.tsx",
      "parent": "/tesis/prop-jurados"
    },
    "/unidad/$name/roles": {
      "filePath": "unidad/$name/roles.tsx",
      "parent": "/unidad/$name"
    },
    "/unidad/$name/subunidades": {
      "filePath": "unidad/$name/subunidades.tsx",
      "parent": "/unidad/$name"
    },
    "/unidad/$name/usuarios": {
      "filePath": "unidad/$name/usuarios.tsx",
      "parent": "/unidad/$name"
    },
    "/unidad/$name/": {
      "filePath": "unidad/$name/index.tsx",
      "parent": "/unidad/$name"
    }
  }
}
ROUTE_MANIFEST_END */
