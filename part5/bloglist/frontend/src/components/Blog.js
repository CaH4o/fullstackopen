import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const blogStyle = {
    marginTop: 2,
    paddingTop: 6,
    paddingBottom: 4,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setIsCollapsed(!isCollapsed)
  }

  const updateLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = () => {
    if (window.confirm('Do you really want to leave?')) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        {' by '}
        {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {isCollapsed ? 'view' : 'hide'}
        </button>
      </div>
      <div style={{ 'display': isCollapsed ? 'none' : '' }}>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div style={{ 'display': isCollapsed ? 'none' : '' }}>
        {blog.likes} <button onClick={updateLikes}>like</button>
      </div>
      <div style={{ 'display': isCollapsed ? 'none' : '' }}>
        {blog.user.name}
      </div>
      <button
        style={{
          color: 'blue',
          backgroundColor: 'lightblue',
          'display': isCollapsed ? 'none' : '',
        }}
        onClick={handleRemoveBlog}
      >
        remove
      </button>
    </div>
  )
}

export default Blog
