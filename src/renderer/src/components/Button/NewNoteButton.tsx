import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuFilePen } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleNewNote = async () => {
    await createEmptyNote()
    console.log('new note created')
  }

  return (
    <ActionButton onClick={handleNewNote} {...props}>
      <LuFilePen className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
