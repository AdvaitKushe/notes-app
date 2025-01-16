import { useAtomValue, useSetAtom } from "jotai"

import { savedNoteAtom, selectedNoteAtom } from "@renderer/store"
import { useRef } from "react"
import { MDXEditorMethods } from "@mdxeditor/editor"
import { NoteContent } from "@shared/model"
import { throttle } from "lodash"
import { autoSaveInterval } from "@shared/constant"

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const savedNote = useSetAtom(savedNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)     
    
    const handleAutoSaving = throttle(async (content: NoteContent) => {
        if (!selectedNote) return

        console.log('auto saving:', selectedNote.title)
        await savedNote(content)
    }, autoSaveInterval, {
        leading: false,
        trailing: true
    })

    const handleBlur = async () => {
        if (!selectedNote) return

        handleAutoSaving.cancel()
        const content = editorRef.current?.getMarkdown()
        if (content != null ){
            await savedNote(content)
        }
    }

    return {
        editorRef,
        selectedNote,
        handleAutoSaving,
        handleBlur
    }
}