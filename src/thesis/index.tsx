import ThesisManagement from './components/ThesisManagement'

export default function Tesis() {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-4xl font-bold">Tesis</h2>
      </div>
      <section className="w-4/5 md:w-3/5 max-w-6xl mx-auto">
        <ThesisManagement />
      </section>
    </div>
  )
}
