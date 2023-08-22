import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { autoLogin, logout } from './reducers/userReducer'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  useEffect(() => {
    if (notification.message === 'token expired') {
      dispatch(logout())
    }
  }, [notification])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h2>{user.token ? 'blogs' : 'log in to application'}</h2>

      <Notification />

      {user.token && (
        <div>
          <div>
            {`${user.name} logged in `}
            <button onClick={handleLogout}>logout</button>
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
