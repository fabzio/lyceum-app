import SearchStudentInput from "./components/SearchStudentInput";
import StudentTable from "./components/StudentTable";

export default function StudentManagement() {
  return (
    <div className="flex flex-col my-6 p-4 gap-2 rounded-lg shadow-md">
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SearchStudentInput />

        {/* TODO: Implementar MasiveStudentsDialog y NewStudentDialog
        <div className="flex gap-2">
          <MasiveStudentsDialog />
          <NewStudentDialog />
        </div> */}
      </div>
      <StudentTable />
    </div>
  )
}
