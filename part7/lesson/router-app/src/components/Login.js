// ======================= 2 ======================= //
/* 
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login */

// ======================= 3 ======================= //

import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>password:</Form.Label>
          <Form.Control type='password' />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
