// ======================= 2 ======================= //
/* 
import { Link } from 'react-router-dom'

const NavBar = ({ user }) => {
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to='/'>
        home
      </Link>
      <Link style={padding} to='/notes'>
        notes
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user ? (
        <em>{user} logged in</em>
      ) : (
        <Link style={padding} to='/login'>
          login
        </Link>
      )}
    </div>
  )
}

export default NavBar */

// ======================= 3 ======================= //
/* 
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = ({ user }) => {
  const padding = {
    padding: 5,
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>
              home
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/notes'>
              notes
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users'>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user ? (
              <em style={padding}>{user} logged in</em>
            ) : (
              <Link style={padding} to='/login'>
                login
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar */

// ======================= 4-1 ===================== //

/* import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'

const NavBar = ({ user }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <Button color='inherit'>
          <Link to='/'>home</Link>
        </Button>
        <Button color='inherit'>
          <Link to='/notes'>notes</Link>
        </Button>
        <Button color='inherit'>
          <Link to='/users'>users</Link>
        </Button>
        <Button color='inherit'>
          {user ? <em>{user} logged in</em> : <Link to='/login'>login</Link>}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar */

// ======================= 4-2 ===================== //
/* 
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const NavBar = ({ user }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          home
        </Button>
        <Button color='inherit' component={Link} to='/notes'>
          notes
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Button color='inherit' component={Link} to='/login'>
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar */

// ======================= 5 ======================= //

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const NavBar = ({ user }) => {
  const padding = {
    padding: 5,
  }

  return (
    <Navigation>
      <Link style={padding} to='/'>
        home
      </Link>
      <Link style={padding} to='/notes'>
        notes
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      {user ? (
        <em>{user} logged in</em>
      ) : (
        <Link style={padding} to='/login'>
          login
        </Link>
      )}
    </Navigation>
  )
}

export default NavBar