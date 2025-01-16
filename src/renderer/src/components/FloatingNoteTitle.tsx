import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@renderer/store'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const title = selectedNote?.title|| 'Note Title'

  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
