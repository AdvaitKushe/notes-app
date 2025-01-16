import { NewNoteButton, DeleteNoteButton } from '@/components'
import { notesAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { ComponentProps } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  const [notes, setNotes] = useAtom(notesAtom)

  return (
    
    <div {...props}>
      <NewNoteButton  />
      <DeleteNoteButton />
    </div>
  )
}
