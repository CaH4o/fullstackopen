import { useDispatch, useSelector } from 'react-redux'

import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  // 1
  // const notes = useSelector((state) => state)
  // 2
  // const notes = useSelector((state) => state.notes)
  // 3
  // const notes = useSelector((state) => {
  //  if (state.filter === 'ALL') {
  //    return state.notes
  //  }
  //  return state.filter === 'IMPORTANT'
  //    ? state.notes.filter((note) => note.important)
  //    : state.notes.filter((note) => !note.important)
  //})
  // 4
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  )
}

export default Notes
