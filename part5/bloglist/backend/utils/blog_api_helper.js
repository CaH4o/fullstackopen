const Blog = require('../models/blog')
const User = require('../models/user')

const initUser = {
  'username': 'root',
  'name': 'Superuser',
  'password': 'salainen',
}

const initBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const userBlogsInDb = async () => {
  const user = await User.find({}).select('blogs')
  const userBlogs = user.map((user) => user.blogs).flat()
  return userBlogs.map((blog) => blog.toString())
}

module.exports = {
  initUser,
  initBlogs,
  blogsInDb,
  userBlogsInDb,
}
