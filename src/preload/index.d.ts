declare global {
  interface Window {
    // electron: ElectronAPI
    //api: unknown
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
    }
  }
}
