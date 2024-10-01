import SecurityManagement from './components/SecurityManagement'

export default function Security() {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-4xl font-bold">Seguridad</h2>
      </div>
      <section className="w-4/5 md:w-3/5 max-w-6xl mx-auto">
        <SecurityManagement />
      </section>
    </div>
  )
}
