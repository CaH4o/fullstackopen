import { useState } from 'react'

const NoteForm = ({ createNote } /* { onSubmit, handleChange, value } */) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={/* onSubmit */ addNote}>
        <input
          value={newNote}
          /* onChange={handleChange} */
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
