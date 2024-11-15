import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@frontend/components/ui/resizable'
import CoverLetterDetailMain from './components/PresentationCardMain'
import CoverLetterHistory from './components/PresentationCardHistory'

export default function CoverLetterDetailDetailSection() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
    >
      <ResizablePanel defaultSize={80}>
        <CoverLetterDetailMain />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <CoverLetterHistory />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
