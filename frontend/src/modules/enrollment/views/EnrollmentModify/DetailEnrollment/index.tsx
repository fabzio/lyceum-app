import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@frontend/components/ui/resizable'
import EnrollmentModifyMain from './EnrollmentModifyMain'
import EnrollmentModifyAux from './EnrollmentModifyAux'
//import EnrollmentModifyAside from './EnrollmentModifyAside'

export default function DetailEnrollment() {
  //<EnrollmentModifyAside />
  return (
    <div className="flex h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
      >
        <ResizablePanel defaultSize={70} className="px-4">
          <EnrollmentModifyMain />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <EnrollmentModifyAux />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
