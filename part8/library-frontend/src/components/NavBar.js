import { Link } from 'react-router-dom'

const NavBar = () => {
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
      <Link style={padding} to='/add'>
        Add book
      </Link>
    </div>
  )
}

export default NavBar
