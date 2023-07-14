import { createStore } from 'redux'

/*
//1
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    //1
    //state.push(action.payload)
    //return state

    //2
    return state.concat(action.payload)
  }

  return state
}
*/

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      //1
      //return state.concat(action.payload)
      //2
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map((note) => (note.id !== id ? note : changedNote))
    }
    default:
      return state
  }
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

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2,
  },
})

export default noteReducer
