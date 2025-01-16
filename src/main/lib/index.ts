import { homedir } from 'os'
import { appDirectoryName, fileEncoding, welcomeNoteFileName } from '../../shared/constant'

import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { NoteInfo } from '../../shared/model'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '../../shared/types'
import { dialog } from 'electron'
import path from 'path'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((file) => file.endsWith('.md'))

  if (isEmpty(notes)) {
    console.log('welcome note')
    const welcomeNote = await readFile(welcomeNoteFile, { encoding: fileEncoding })
    await writeFile(`${rootDir}/${welcomeNoteFileName}`, welcomeNote, { encoding: fileEncoding })
    notes.push(welcomeNoteFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const rootDir = getRootDir()

  const fileStat = await stat(`${rootDir}/${fileName}`)

  const noteInfo: NoteInfo = {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStat.mtimeMs
  }
  console.log(fileName)
  return noteInfo
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${fileName}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  console.log(`writing note $(filename)`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Create Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('create note canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Invalid directory',
      message: `Please select a directory within ${rootDir}`
    })
    return false
  }

  await writeFile(filePath, '', { encoding: fileEncoding })

  return fileName
}

export const deleteNote: DeleteNote = async (title) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${title}?`,
    detail: 'This action cannot be undone.',
    buttons: ['Cancel', 'Delete'],
    defaultId: 1,
    cancelId: 0
  })

  if (response === 0) {
    console.log('delete note canceled')
    return false
  }

  console.log(`deleting note ${title}`)
  await remove(`${rootDir}/${title}.md`)

  return true
}
