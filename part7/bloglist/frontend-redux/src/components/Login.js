import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = { username, password }

    dispatch(login(credentials))

    setUsername('')
    setPassword('')
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
