import SecurityManagement from './components/SecurityManagement'

export default function Security() {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-4xl font-bold">Seguridad</h2>
      </div>
      <section className="w-[700]">
        <SecurityManagement />
      </section>
    </div>
  )
}
