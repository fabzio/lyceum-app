import PageLayout from "@frontend/layouts/PageLayout";
import { HiringModule } from "./hiring.module";

export default function Hiring() {
  return (
    <PageLayout name={HiringModule.label}>
      <div>
        hola mundo, aquí disfrutando
      </div>
    </PageLayout>
  )
}