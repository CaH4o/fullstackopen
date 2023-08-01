// ======================================================== //
// ========================= 2 ============================ //
// ======================================================== //
/*
// 2-1
//import { useSelector, useDispatch } from 'react-redux'
//import { createNote, toggleImportanceOf } from './reducers/noteReducer'

// 2-2
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {
  // 2-1
  //const dispatch = useDispatch()
  //const notes = useSelector((state) => state)

  //const addNote = (event) => {
  //  event.preventDefault()
  //  const content = event.target.note.value
  //  event.target.note.value = ''
  //  dispatch(createNote(content))
  //}

  //const toggleImportance = (id) => {
  //  dispatch(toggleImportanceOf(id))
  //}

  //return (
  //  <div>
  //    <form onSubmit={addNote}>
  //      <input name='note' />
  //      <button type='submit'>add</button>
  //    </form>
  //    <ul>
  //      {notes.map((note) => (
  //        <li key={note.id} onClick={() => toggleImportance(note.id)}>
  //          {note.content} <strong>{note.important ? 'important' : ''}</strong>
  //        </li>
  //      ))}
  //    </ul>
  //  </div>
  //)

  // 2-2
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App */

// ======================================================== //
// ========================= 3 ============================ //
// ======================================================== //
/*
// 3-1
import NewNote from './components/NewNote'
import Notes from './components/Notes'

// 3-2
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  // 3-1
  //const filterSelected = (value) => {
  //  console.log(value)
  //}

  //return (
  //  <div>
  //    <NewNote />
  //    <div>
  //      all{' '}
  //      <input
  //        type='radio'
  //        name='filter'
  //        onChange={() => filterSelected('ALL')}
  //      />
  //      important{' '}
  //      <input
  //        type='radio'
  //        name='filter'
  //        onChange={() => filterSelected('IMPORTANT')}
  //      />
  //      nonimportant{' '}
  //      <input
  //        type='radio'
  //        name='filter'
  //        onChange={() => filterSelected('NONIMPORTANT')}
  //      />
  //    </div>
  //    <Notes />
  //  </div>
  //)

  // 3-2
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App */

// ======================================================== //
// ========================= 5 ============================ //
// ======================================================== //
/*
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App */

// ======================================================== //
// ========================= 6 ============================ //
// ======================================================== //
/*
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeNotes } from './reducers/noteReducer'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
*/
// ======================================================== //
// ========================= 7 ============================ //
// ======================================================== //
/*
//7_2
//import { useQuery } from 'react-query'
//import axios from 'axios'

//7_3
import { useQuery } from 'react-query'
import { getNotes } from './requests'

const App = () => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
  }

  //7_1
  //const notes = []

  //7_2
  //const result = useQuery('notes', () =>
  //  axios.get('http://localhost:3001/notes').then((res) => res.data)
  //)

  //7_3
  const result = useQuery('notes', getNotes)

  //7_2
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  //7_2
  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  )
}

export default App */

// ======================================================== //
// ========================= 8 ============================ //
// ======================================================== //

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation(createNote, {
    //8_1
    //onSuccess: () => {
    //  queryClient.invalidateQueries('notes')
    //},
    //8_2
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    },
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const updateNoteMutation = useMutation(updateNote, {
    //8_1
    //onSuccess: () => {
    //  queryClient.invalidateQueries('notes')
    //},
    //8_2
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData(
        'notes',
        notes.map((n) => (n.id !== updatedNote.id ? n : updatedNote))
      )
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  const result = useQuery(
    'notes',
    getNotes,
    //8_3
    {
      refetchOnWindowFocus: false,
    }
  )

  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </div>
  )
}

export default App
