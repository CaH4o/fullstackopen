//import axios from 'axios';
import { useState, useEffect } from 'react';

import { Note } from './types';
import { getAllNotes, createNote } from './services/noteService';

const App = (): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([
    /* { id: 1, content: 'testing' } */
  ]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    /*
    axios.get('http://localhost:3001/notes').then((response) => {
      // response.body is of type any
      setNotes(response.data as Note[]);
    });
    */

    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    //const noteToAdd = {
    //  content: newNote,
    //  id: notes.length + 1,
    //};
    //setNotes(notes.concat(noteToAdd));

    //axios
    //  .post<Note>('http://localhost:3001/notes', { content: newNote })
    //  .then((response) => {
    //    setNotes(notes.concat(response.data));
    //  });

    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data));
    });

    setNewNote('');
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
