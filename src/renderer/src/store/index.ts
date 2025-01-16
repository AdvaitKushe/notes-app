import { NoteContent, NoteInfo } from "@shared/model";
import { atom } from "jotai";
import { mockNotes } from "./mocks";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
    const notes = await window.context.getNotes()

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)


//basically this gets the slectedNote from the note index, kinda like an array indexer 
const selectedNoteAtomAsync = atom(async (get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null || !notes) return null

    const selectedNote = notes[selectedNoteIndex]

    const content = await window.context.readNote(selectedNote.title)

    return {
        ...selectedNote,
        content: content
    }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
    title: '',
    lastEditTime: Date.now(),
    content: ''
})

export const createEmptyNoteAtom = atom(null, async (get, set) =>  {
    const notes = get(notesAtom)
    if (!notes) return

    const title = await window.context.createNote()
    
    if (title === false) return

    const newNote = {
        title,
        lastEditTime: Date.now(),
    }
    console.log('new note created', newNote)

    set(notesAtom, [newNote, ...notes.filter(note => note.title !== newNote.title)])
    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {

    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null || !notes) return

    const deleted = await window.context.deleteNote(notes[selectedNoteIndex].title)

    if (!deleted) return

    set(notesAtom, notes.filter((_, index) => index !== selectedNoteIndex))
    set(selectedNoteIndexAtom, null)
})

export const savedNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (selectedNote ==  null || !notes) return

    await window.context.writeNote(selectedNote.title, newContent)
    set(
        notesAtom,
        notes.map((note) => {
        if (note.title === selectedNote.title) {
            return {
                ...note,
                lastEditTime: Date.now(),
                
            }
        }       
        return note
    }))
})