import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@frontend/components/ui/table'

export default function AsingRoles() {
  const asigments = [
    {
      user: 'Juan',
      role: 'Admin',
    },
    {
      user: 'Pedro',
      role: 'alumno',
    },
  ]
  return (
    <Table>
      <TableBody>
        {asigments.map((asigment, index) => (
          <TableRow key={index} className="py-4">
            <TableCell>{asigment.user}</TableCell>
            <TableCell>{asigment.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
