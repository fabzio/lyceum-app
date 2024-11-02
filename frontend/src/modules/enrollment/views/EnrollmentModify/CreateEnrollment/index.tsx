import {
    ResizablePanel,
    ResizablePanelGroup,
  } from '@frontend/components/ui/resizable'
import EnrollmentCreateMain from './EnrollmentCreateMain'

  export default function CreateEnrollment() {
    return (
      <div className="flex h-full">

        <ResizablePanelGroup
          direction="horizontal"
          className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
        >
          <ResizablePanel defaultSize={100} className="px-4">
            <EnrollmentCreateMain />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  }
