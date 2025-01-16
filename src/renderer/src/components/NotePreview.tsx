import React from 'react'
import { ComponentProps } from 'react'
import { NoteInfo } from '@shared/model'
import { cn, formatDateFromMs } from '@renderer/utils'

//extend the NoteInfo type with the isActive property
export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const formattedDate = formatDateFromMs(lastEditTime)
  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-blond truncate">{title}</h3>
      <span className="incline-block w-full mb text-xs font-light text-left"> {formattedDate}</span>
    </div>
  )
}
