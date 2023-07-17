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

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id },
  }
}

export default noteReducer
