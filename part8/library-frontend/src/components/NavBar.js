import { Link } from 'react-router-dom'

const NavBar = ({ logout, token }) => {
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to='/authors'>
        Authors
      </Link>
      <Link style={padding} to='/books'>
        Books
      </Link>
      {token ? (
        <>
          <Link style={padding} to='/add'>
            Add book
          </Link>
          <Link style={padding} to='/recommended'>
            Recommended
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link style={padding} to='/login'>
          Login
        </Link>
      )}
    </div>
  )
}

export default NavBar
