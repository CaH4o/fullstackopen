import { useContext, useEffect } from 'react'

import { useNotificationValue } from './NotificationContext'
import UserContext, { localStorageAppUser } from './UserContext'

import blogService from './services/blogs'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, userDispatch] = useContext(UserContext)
  const { message } = useNotificationValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageAppUser)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (message === 'token expired') {
      logout()
    }
  }, [message])

  const logout = () => {
    window.localStorage.removeItem(localStorageAppUser)
    userDispatch({ type: 'RESET' })

    blogService.setToken(null)
  }

  return (
    <div>
      <h2>{user.token ? 'blogs' : 'log in to application'}</h2>

      <Notification />

      {user.token && (
        <div>
          <div>
            {`${user.name} logged in `}
            <button onClick={logout}>logout</button>
          </div>
          <Blogs />
        </div>
      )}

      {!user.token && (
        <Togglable buttonLabel='to login'>
          <Login />
        </Togglable>
      )}
    </div>
  )
}

export default App
