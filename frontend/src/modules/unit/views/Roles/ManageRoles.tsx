import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@frontend/components/ui/table'

export default function ManageRoles() {
  const roles = [
    {
      name: 'Admin',
      permissions: ['create', 'read', 'update', 'delete'],
    },
    {
      name: 'alumno',
      permissions: ['read'],
    },
    {
      name: 'profesor',
      permissions: ['read', 'update'],
    },
  ]
  return (
    <Table>
      <TableBody>
        {roles.map((role, index) => (
          <TableRow key={index} className="py-4">
            <TableCell>{role.name}</TableCell>
            <TableCell>{role.permissions.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
