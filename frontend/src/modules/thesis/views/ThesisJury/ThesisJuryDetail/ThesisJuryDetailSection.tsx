import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@frontend/components/ui/resizable'
import ThesisJuryMain from './components/ThesisJuryMain'
import ThesisJuryHistory from './components/ThesisJuryList'

export default function ThesisJuryDetailSection() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
    >
      <ResizablePanel defaultSize={70} className="px-4">
        <ThesisJuryMain />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <ThesisJuryHistory />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
