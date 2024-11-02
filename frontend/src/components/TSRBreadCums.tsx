import { useTSRBreadCums } from '@frontend/hooks/useTSRBreadCums'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { Link } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

export default function TSRBreadCums() {
  const { breadcrumbRoutes } = useTSRBreadCums()

  if (breadcrumbRoutes.length === 0) return <div></div>
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/" className="capitalize">
            Inicio
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbRoutes.map((route, index) => {
          const label = route.name
            .replace(/-/g, ' ')
            .replace(/^./, (char) => char.toUpperCase())
          return (
            <Fragment key={route.path}>
              <BreadcrumbItem>
                <Link to={route.path}>{label}</Link>
              </BreadcrumbItem>
              {index < breadcrumbRoutes.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
