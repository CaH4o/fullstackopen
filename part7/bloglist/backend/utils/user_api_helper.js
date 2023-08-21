const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const initUsers = [
  {
    'username': 'root',
    'name': 'Superuser',
    'password': 'salainen',
  },
  {
    'username': 'mluukkai',
    'name': 'Matti Luukkainen',
    'password': 'salainen',
  },
]

module.exports = {
  usersInDb,
  initUsers,
}
