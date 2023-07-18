//import { useSelector, useDispatch } from 'react-redux'

//import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  /* const dispatch = useDispatch()
  const notes = useSelector((state) => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  } */

  /*   const filterSelected = (value) => {
    console.log(value)
  } */

  return (
    <div>
      {/* <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form> */}
      <NewNote />
      {/* <div>
        all{' '}
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
        />
        important{' '}
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        nonimportant{' '}
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('NONIMPORTANT')}
        />
      </div> */}
      <VisibilityFilter />
      {/* <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul> */}
      <Notes />
    </div>
  )
}

export default App
