// ======================================================== //
// ========================= 2 ============================ //
// ======================================================== //
/*
import { useDispatch } from 'react-redux'

import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote */

// ======================================================== //
// ========================= 5 ============================ //
// ======================================================== //
/*
import { useDispatch } from 'react-redux'

import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    // 5-4
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))

    // 5
    //dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote */

// ======================================================== //
// ========================= 6 ============================ //
// ======================================================== //

import { useDispatch } from 'react-redux'

import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote
