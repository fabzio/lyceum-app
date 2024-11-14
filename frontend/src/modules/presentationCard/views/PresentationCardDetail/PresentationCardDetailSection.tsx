import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@frontend/components/ui/resizable'
import PresentationCardMain from './components/PresentationCardMain'
import PresentationCardHistory from './components/PresentationCardHistory'

export default function PresentationCardDetailSection() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
    >
      <ResizablePanel defaultSize={80}>
        <PresentationCardMain />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <PresentationCardHistory />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
