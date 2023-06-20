const usersRouter = require('express').Router()
//const bcrypt = require('bcrypt')

const User = require('../models/user')
//const config = require('../utils/config')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

/*   const saltRounds = parseInt(config.SALTROUNDS)
  const passwordHash = await bcrypt.hash(password, parseInt(saltRounds)) */

  const user = new User({
    username,
    name,
    //passwordHash,
    password
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
