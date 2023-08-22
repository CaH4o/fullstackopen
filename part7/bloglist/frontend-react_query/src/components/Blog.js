import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
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
    if (window.confirm('Do you really want to remove it?')) {
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blog_title'>
        <span>{blog.title}</span>
        <span> by </span>
        <span>{blog.author} </span>
        <button onClick={toggleVisibility}>
          {isCollapsed ? 'view' : 'hide'}
        </button>
      </div>
      <div
        style={{ 'display': isCollapsed ? 'none' : '' }}
        className='blog_url'
      >
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div
        style={{ 'display': isCollapsed ? 'none' : '' }}
        className='blog_likes'
      >
        Likes: {blog.likes}{' '}
        <button onClick={updateLikes} className='blog_btn_update_like'>
          like
        </button>
      </div>
      <div
        style={{ 'display': isCollapsed ? 'none' : '' }}
        className='blog_user'
      >
        {blog.user.name}
      </div>
      <button
        style={{
          color: 'blue',
          backgroundColor: 'lightblue',
          'display':
            user.username !== blog.user.username || isCollapsed ? 'none' : '',
        }}
        className='blog_btn_remove'
        onClick={handleRemoveBlog}
      >
        remove
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
