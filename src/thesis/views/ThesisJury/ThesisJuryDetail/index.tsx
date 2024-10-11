import ThesisJuryAside from './ThesisJuryAside'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import ThesisJuryMain from './ThesisJuryMain'
import ThesisJuryHistory from './ThesisJuryHistory'

export default function ThesisJuryDetail() {
  return (
    <div className="flex h-full">
      <ThesisJuryAside />
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
    </div>
  )
}
