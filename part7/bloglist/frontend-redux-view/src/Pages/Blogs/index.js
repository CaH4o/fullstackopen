import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from '@mui/material'

import { initializeBlogs, createBlog } from '../../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from '../../components/Togglable'

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

  return (
    <Box sx={{ marginTop: '1rem'  }}>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
        <Table size='small'>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow hover key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    <span>{blog.title}</span>
                    <span> by </span>
                    <span>{blog.author} </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Blogs
