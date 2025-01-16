import { ComponentProps } from 'react'
import { mockNotes } from '@/store/mocks'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { isEmpty } from 'lodash'
export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4', className)}>
        <span className="text-zinc-400">No notes yet</span>
      </ul>
    )
  }
  return (
    <ul {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={index}
          isActive={index === selectedNoteIndex}
          onClick={handleNoteSelect(index)} //this sets the selectedNoteIndex value
          {...note}
        />
      ))}
    </ul>
  )
}
