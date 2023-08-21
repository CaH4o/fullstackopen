import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)

      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      const message = `succesful login as ${user.name}`
      dispatch(setNotification({ type: 'login', message }))

      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = exception.response.data.error || 'Unexpected error'
      dispatch(setNotification({ type: 'error', message }))
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
}

export default Login
