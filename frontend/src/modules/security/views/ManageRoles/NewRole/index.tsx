import RolePermissionForm from '../components/RolePermissionForm'

export default function NewRole() {
  return (
    <div className="w-full md:w-3/5 px-3">
      <h2 className="font-bold text-4xl">Nuevo rol</h2>
      <p className="text-lg">
        {' '}
        Crea un rol personalizado para los usuarios del sistema
      </p>
      <RolePermissionForm />
    </div>
  )
}
