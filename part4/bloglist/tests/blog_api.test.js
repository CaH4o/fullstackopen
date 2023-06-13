const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const init = require('../utils/dummy_blogs')
const helper = require('../utils/blog_api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = init.listWithManyBlog.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(init.listWithManyBlog.length)
})

test('"id" property is defined in a blog', async () => {
  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = { ...init.listWithOneBlog[0] }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDbAfterPost = await helper.blogsInDb()
  expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length + 1)

  const titles = blogsInDbAfterPost.map((b) => b.title)
  expect(titles).toContain(newBlog.title)

  const authors = blogsInDbAfterPost.map((b) => b.author)
  expect(authors).toContain(newBlog.author)

  const urls = blogsInDbAfterPost.map((b) => b.url)
  expect(urls).toContain(newBlog.url)
})

test('a blog without likes can be added with 0', async () => {
  const newBlog = { ...init.listWithOneBlog[0] }
  delete newBlog.likes

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDbAfterPost = await helper.blogsInDb()
  expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length + 1)

  const savedBlog = response.body
  expect(savedBlog.likes).toBe(0)
  expect(blogsInDbAfterPost).toContainEqual(savedBlog)

  delete savedBlog.likes
  delete savedBlog.id
  delete newBlog._id
  expect(savedBlog).toEqual(newBlog)
})

test('a blog without title cannot be added', async () => {
  const newBlog = { ...init.listWithOneBlog[0] }
  delete newBlog.title

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect((res) => res.statusMessage === 'Bad Request')

  const blogsInDbAfterPost = await helper.blogsInDb()
  expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length)
})

test('a blog without url cannot be added', async () => {
  const newBlog = { ...init.listWithOneBlog[0] }
  delete newBlog.url

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect((res) => res.statusMessage === 'Bad Request')

  const blogsInDbAfterPost = await helper.blogsInDb()
  expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
