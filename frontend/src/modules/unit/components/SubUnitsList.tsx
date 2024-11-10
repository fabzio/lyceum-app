import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@frontend/components/ui/table'

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
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
