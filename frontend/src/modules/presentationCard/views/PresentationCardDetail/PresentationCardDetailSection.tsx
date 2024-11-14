import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@frontend/components/ui/resizable'
import ThesisThemeMain from './components/ThesisThemeMain'
import ThesisThemeHistory from './components/ThesisThemeHistory'

export default function ThesisThemeDetailSection() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[calc(100vh-3.5rem)] overflow-y-hidden items-stretch"
    >
      <ResizablePanel defaultSize={80}>
        <ThesisThemeMain />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <ThesisThemeHistory />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
