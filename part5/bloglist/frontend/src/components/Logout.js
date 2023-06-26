import blogService from '../services/blogs'

const Logout = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      {`${user.name} logged in `}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout
