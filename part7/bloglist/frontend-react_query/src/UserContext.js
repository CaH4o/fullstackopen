import { createContext, useReducer, useContext } from 'react'

const initialState = { name: '', username: '', token: null }

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      const user = action.payload
      return user
    }
    case 'RESET':
      return initialState
    default: {
      console.log(`Unhandled type: ${action.type}, payload: ${action.payload}`)
      return state
    }
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [value, dispatch] = useReducer(userReducer, 0)

  return (
    <UserContext.Provider value={[value, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const valueAndDispatch = useContext(UserContext)
  return valueAndDispatch[0]
}

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext)
  return valueAndDispatch[1]
}

export const localStorageAppUser = 'loggedBlogAppUser'

export default UserContext
