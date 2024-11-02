import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@frontend/components/ui/table'
import { Link } from '@tanstack/react-router'

export default function SubUnitsList({ subunits = [] }: { subunits: any }) {
  if (!subunits.length) {
    return <div>No subunits</div>
  }

  return (
    <div>
      <Table>
        <TableBody>
          {subunits.map((subunit: any) => (
            <TableRow key={subunit.id} className="py-4">
              <TableCell>
                <Link
                  to="/unidad/$name"
                  params={{
                    name: subunit.name,
                  }}
                  className="inline-block h-full w-full"
                >
                  {subunit.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
