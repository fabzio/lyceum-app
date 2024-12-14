import NewTermDialog from './components/NewTermDialog'
import TermTable from './components/TermTable'

export default function TermManagement() {
  //<NewTermDialog/>
  return (
    <div>
      <div className="flex mb-2 gap-2">
        <NewTermDialog /> {/* Componente para agregar un nuevo término */}
      </div>
      <TermTable /> {/* Pasamos la lista de términos a la tabla */}
    </div>
  )
}
