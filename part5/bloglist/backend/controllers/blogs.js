const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')
const authorization = require('../utils/middleware').authorization

blogsRouter.get('/', async (request, response) => {
  const user = request.body.user

  const blogs = await Blog.find({ user: user._id }).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })

  const savedBlog = await newBlog.save()

  await User.updateOne(
    { _id: user._id },
    { $set: { blogs: user.blogs.concat(savedBlog._id) } }
  )

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', authorization, async (request, response) => {
  const user = request.body.user

  const userBlogs = user.blogs.filter(
    (userBlog) => userBlog.toString() !== request.params.id
  )

  await User.updateOne({ _id: user._id }, { $set: { blogs: userBlogs } })
  await Blog.deleteOne({ _id: request.params.id })

  response.status(204).end()
})

blogsRouter.put('/:id', authorization, async (request, response) => {
  const { title, author, url, likes } = request.body

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })

  response.json(result)
})

module.exports = blogsRouter
