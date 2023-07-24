import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers } from 'redux'
//4
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'
import noteReducer, { /* appendNote */ /* setNotes  */} from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
//import noteService from './services/notes'

//2
//const store = createStore(noteReducer)

//3
//const reducer = combineReducers({
//  notes: noteReducer,
//  filter: filterReducer,
//})

//const store = createStore(reducer)

//4
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

/* noteService.getAll().then((notes) =>
  //   notes.forEach((note) => {
  //  store.dispatch(appendNote(note))
  //})
  store.dispatch(setNotes(notes))
)
 */
//console.log(store.getState())

/*
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
 */
//1 - from part 5
//ReactDOM.createRoot(document.getElementById('root')).render(<App />)

//2 - part 6
/* const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id },
  }
}

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // store.dispatch({
    //  type: 'NEW_NOTE',
    //  payload: {
    //    content,
    //    important: false,
    //    id: generateId(),
    //  },
    //})
    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    // store.dispatch({
    //  type: 'TOGGLE_IMPORTANCE',
    //  payload: { id },
    //})
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(renderApp)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
*/

//3
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
