import { useState } from 'react'

import { useSetNotification, types } from '../NotificationContext'
import { useUserDispatch, localStorageAppUser } from '../UserContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setNotification = useSetNotification()
  const userDispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)

      userDispatch({ type: 'SET', payload: user })
      window.localStorage.setItem(localStorageAppUser, JSON.stringify(user))
      blogService.setToken(user.token)

      const message = `succesful login as ${user.name}`
      setNotification(message, types.login)

      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      setNotification(message)
    }
  }

  return (
    <form onSubmit={handleLogin} id='login-form'>
      <div>
        <span>username </span>
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <span>password </span>
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default Login
