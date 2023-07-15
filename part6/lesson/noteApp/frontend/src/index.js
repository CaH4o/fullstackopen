import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

//import App from './App'
import './index.css'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2,
  },
})

//1 - from part 5
//ReactDOM.createRoot(document.getElementById('root')).render(<App />)

//2 - use only reducer
ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <ul>
      {store.getState().map((note) => (
        <li key={note.id}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </ul>
  </div>
)
