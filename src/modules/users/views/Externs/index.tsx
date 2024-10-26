import MasiveExternsDialog from "./components/MasiveExternsDialog";
import SearchExternInput from "./components/SearchExternInput";
import ExternTable from "./components/ExternTable";

export default function ExternManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchExternInput />

        {/* TODO: Implementar NewExternDialog*/
        <div className="flex gap-2">
          <MasiveExternsDialog />
        </div>}
      </div>
      <ExternTable />
    </div>
  )
}
