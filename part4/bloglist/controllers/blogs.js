const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const getTokenFrom = require('../utils/middleware').getTokenFrom

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, token } = request.body

  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  result ? response.status(204).end() : response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  result ? response.json(result) : response.status(404).end()
})

module.exports = blogsRouter
