import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
