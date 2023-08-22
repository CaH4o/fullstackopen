import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  initializeBlogs,
  createBlog,
  updateBlog,
  removeBlog,
} from '../reducers/blogReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => state.blogs)
    .slice()
    .sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleCreateBlog = async (blog) => {
    dispatch(createBlog({ blog, user }))
    blogFormRef.current.toggleVisibility()
  }

  const handleUpdateBlog = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleRemoveBlog = async (blog) => {
    dispatch(removeBlog(blog))
  }

  return (
    <div>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdateBlog}
          removeBlog={handleRemoveBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default Blogs
