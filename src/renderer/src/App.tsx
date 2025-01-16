import { useRef } from 'react'
import {
  RootLayout,
  Sidebar,
  Content,
  DraggableTopBar,
  ActionButtonsRow,
  MarkDownEditor,
  FloatingNoteTitle
} from './components'
import { NotePreviewList } from './components/NotePreviewList'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetContainerRef = () => {
    contentContainerRef.current?.scrollTo(0,0)
  }
  return (
    
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-1" onSelect = {resetContainerRef}/>
        </Sidebar>

        <Content ref = {contentContainerRef} className="border-l bg-zinc-900/50 border-white/20">
          <FloatingNoteTitle className = 'pt-2' />
          <MarkDownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
