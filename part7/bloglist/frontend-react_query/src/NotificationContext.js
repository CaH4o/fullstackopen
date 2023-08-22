import { createContext, useReducer, useContext } from 'react'

export const types = {
  error: 'error',
  create: 'create',
  login: 'login',
  update: 'update',
  remove: 'remove',
}

const initialState = { message: '', type: null }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      const { message, type } = action.payload
      const newNotification = { message, type }
      return newNotification
    }
    case 'RESET':
      return initialState
    default: {
      console.log(`Unhandled type: ${action.type}, payload: ${action.payload}`)
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [value, dispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[value, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[1]
}

export const useSetNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  const dispatch = notificationAndDispatch[1]

  return (message, type = types.error, time = 5000) => {
    dispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, time)
  }
}

export default NotificationContext
