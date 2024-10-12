import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import ThesisThemeAside from './ThesisThemeAside'
import ThesisThemeMain from './ThesisThemeMain'
import ThesisThemeHistory from './ThesisThemeHistory'

export default function ThesisThemeDetail() {
  return (
    <div className="flex h-full">
      <ThesisThemeAside />
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
    </div>
  )
}
