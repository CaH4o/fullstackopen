import React from "react";

const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

const App = (/* props */ { notes }) => {
  //const { notes } = props;

  const result = notes.map((note) => note.id);
  console.log(result);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
        {notes.map((note) => (
          /*  <li key={note.id}>{note.content}</li> */
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
