/// <reference types="vite/client" />

declare module '*.md' {
  const content: string
  export default content
}

interface Window {
  context: {
    locale: string
    getNotes: GetNotes
    readNote: ReadNote
    writeNote: WriteNote,
    createNote: CreateNote,
    deleteNote: DeleteNote
  }
}