// ======================================================== //
// ========================= 0 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
}

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

const App = () => {
  return (
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
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp() */

// ======================================================== //
// ========================= 1 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

console.log(store.getState())

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

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// 1-2
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

// 1-2
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
    store.dispatch(
      // 1-1
      //{
      //type: 'NEW_NOTE',
      //payload: {
      //  content,
      //  important: false,
      //  id: generateId(),
      //  },
      //}
      // 1-2
      createNote(content)
    )
  }

  const toggleImportance = (id) => {
    store.dispatch(
      // 1-1
      //{
      //  type: 'TOGGLE_IMPORTANCE',
      //  payload: { id },
      //}
      // 1-2
      toggleImportanceOf(id)
    )
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
}) */

// ======================================================== //
// ========================= 2 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
) */

// ======================================================== //
// ========================= 3 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
) */

// ======================================================== //
// ========================= 4 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
) */

// ======================================================== //
// ========================= 5 ============================ //
// ======================================================== //
/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

//5-1
//import noteService from './services/notes'
//import noteReducer, { appendNote } from './reducers/noteReducer'

//5-2
//import noteService from './services/notes'
//import noteReducer, { setNotes } from './reducers/noteReducer'

//5-3
import noteReducer from './reducers/noteReducer'

import filterReducer from './reducers/filterReducer'
import App from './App'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

//5-1
//noteService.getAll().then(notes =>
//  notes.forEach(note => {
//    store.dispatch(appendNote(note))
//  })
//)

//5-2
//noteService.getAll().then((notes) => store.dispatch(setNotes(notes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
) */

// ======================================================== //
// ========================= 6 ============================ //
// ======================================================== //

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
