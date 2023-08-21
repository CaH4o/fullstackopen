const jwt = require('jsonwebtoken')

const logger = require('./logger')
const config = require('./config')
const User = require('../models/user')
const Blog = require('../models/blog')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  const token =
    authorization && authorization.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : null

  request.body.token = token

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.body.token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  request.body.token = undefined
  request.body.user = user

  next()
}

const authorization = async (request, response, next) => {
  const user = request.body.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user._id.toString() !== user._id.toString()) {
    return response.status(403).end()
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  authorization,
  errorHandler,
}
