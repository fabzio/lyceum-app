import NewUnit from './NewUnit'
import SearchUnit from '../../components/SearchUnit'
import SubUnitsList from '../../components/SubUnitsList'

export default function SubUnits() {
  const unit = {
    name: 'PUCP',
    type: 'university',
    description: 'Pontificia Universidad Católica del Perú',
    children: [
      {
        id: 'ciencias-e-ingenieria',
        name: 'Ciencias e Ingeniería',
        type: 'faculty',
        description: 'Facultad de Ciencias e Ingeniería',
      },
      {
        id: 'ingenieria',
        name: 'Ingeniería',
        type: 'department',
        description: 'Departamento de Ingeniería',
      },
    ],
  }
  return (
    <main className="flex flex-col gap-2">
      <section className="flex gap-2">
        <SearchUnit />
        <NewUnit />
      </section>
      <section>
        <SubUnitsList subunits={unit.children} />
      </section>
    </main>
  )
}
