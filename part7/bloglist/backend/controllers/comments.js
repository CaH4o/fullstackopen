const commentsRouter = require('express').Router()

const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog')
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const { title, blogId } = request.body

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).end()
  }

  const newComment = new Comment({
    title,
    blog: blog._id,
  })

  const savedComment = await newComment.save()

  await Blog.updateOne(
    { _id: blog._id },
    { $set: { comments: blog.comments.concat(savedComment._id) } }
  )

  response.status(201).json(savedComment)
})

module.exports = commentsRouter
