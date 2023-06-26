const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/blog_api_helper')

const variables = {}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const initUser = new User(helper.initUser)
  await initUser.save()

  const initBlogs = helper.initBlogs.map((blog) => {
    return { ...blog, user: initUser._id }
  })
  await Blog.insertMany(initBlogs)

  const blogs = await Blog.find({}).select('_id')
  await User.updateOne({ _id: initUser._id }, { $set: { blogs } })

  const credentials = {
    username: helper.initUser.username,
    password: helper.initUser.password,
  }

  const response = await api.post('/api/login').send(credentials)

  variables.token = response.body.token
  variables.userId = initUser._id.toString()
  variables.blogId = blogs[0]._id.toString()
})

describe('get blogs after dummy blogs saved in DB', () => {
  test('successful with status code 200 as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned the same length of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + variables.token)

    expect(response.body).toHaveLength(helper.initBlogs.length)
  })

  test('there are defined "id" property and not defined "_id" property', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', 'Bearer ' + variables.token)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })
})

describe('post a single blog after dummy blogs saved in DB', () => {
  test('successful with status code 201 as json', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('successful the same blog is returned with correct user', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', 'Bearer ' + variables.token)

    expect(response.body.author).toEqual(postBlog.author)
    expect(response.body.title).toEqual(postBlog.title)
    expect(response.body.url).toEqual(postBlog.url)
    expect(response.body.likes).toEqual(postBlog.likes)
    expect(response.body.user).toEqual(variables.userId)
  })

  test('successful the post blog is saved in DB (blog and user)', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', 'Bearer ' + variables.token)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length + 1)

    const ids = blogsInDb.map((b) => b.id)
    expect(ids).toContain(response.body.id)

    const usersBlogs = await helper.userBlogsInDb()
    expect(usersBlogs).toContain(response.body.id)
  })

  test('successful with status code 201, as json, with default value if without likes', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
    }

    const response = await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('fails with status code 400 if without title', async () => {
    const postBlog = {
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 400 if without url', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + variables.token)
      .send(postBlog)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 401 if without authorization or wrong authorization', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.post('/api/blogs').send(postBlog).expect(401)

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + variables.token + 'worng')
      .send(postBlog)
      .expect(401)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })
})

describe('delete a blog after dummy blogs saved in DB', () => {
  test('successful with status code 204', async () => {
    await api
      .delete(`/api/blogs/${variables.blogId}`)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(204)
  })

  test('successful delete in DB (blog and user)', async () => {
    await api
      .delete(`/api/blogs/${variables.blogId}`)
      .set('Authorization', 'Bearer ' + variables.token)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length - 1)

    const ids = blogsInDb.map((b) => b.id)
    expect(ids).not.toContain(variables.blogId)

    const usersBlogs = await helper.userBlogsInDb()
    expect(usersBlogs).not.toContain(variables.blogId)
  })

  test('fails with status code 404 if id is incorrect', async () => {
    const idBlogToDelete = '000000000000000000000000'

    await api
      .delete(`/api/blogs/${idBlogToDelete}`)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(404)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 400 if id is ', async () => {
    let idBlogToDelete
    await api
      .delete(`/api/blogs/${idBlogToDelete}`)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(400)

    idBlogToDelete = '0000'
    await api
      .delete(`/api/blogs/${idBlogToDelete}`)
      .expect(400)
      .set('Authorization', 'Bearer ' + variables.token)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 401 if without authorization or wrong authorization', async () => {
    await api.delete(`/api/blogs/${variables.blogId}`).expect(401)

    await api
      .delete(`/api/blogs/${variables.blogId}`)
      .set('Authorization', 'Bearer ' + variables.token + 'worng')
      .expect(401)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 403 if other user authorization', async () => {
    const username = 'oti'
    const password = 'salainen2'

    const newUser = new User({
      'name': 'Ole',
      username,
      password,
    })

    await newUser.save()

    const response = await api.post('/api/login').send({ username, password })

    await api
      .delete(`/api/blogs/${variables.blogId}`)
      .set('Authorization', 'Bearer ' + response.body.token)
      .expect(403)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })
})

describe('put a blog after dummy blogs saved in DB', () => {
  test('successful with status code 200 as json', async () => {
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${variables.blogId}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('successful the same blog is returned', async () => {
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api
      .put(`/api/blogs/${variables.blogId}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)

    expect(response.body.author).toEqual(putBlog.author)
    expect(response.body.title).toEqual(putBlog.title)
    expect(response.body.url).toEqual(putBlog.url)
    expect(response.body.likes).toEqual(putBlog.likes)
    expect(response.body.user).toEqual(variables.userId)
  })

  test('successful the put blog still in the DB (blog and user)', async () => {
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${variables.blogId}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)

    const ids = blogsInDb.map((b) => b.id)
    expect(ids).toContain(variables.blogId)

    const usersBlogs = await helper.userBlogsInDb()
    expect(usersBlogs).toContain(variables.blogId)
  })

  test('fails with status code 404 if id is incorrect', async () => {
    const putBlog = {
      id: '000000000000000000000000',
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${putBlog.id}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(404)

    await api
      .put('/api/blogs')
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(404)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const putBlog = {
      id: '00000',
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${putBlog.id}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token)
      .expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 401 if without authorization or wrong authorization', async () => {
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.put(`/api/blogs/${variables.blogId}`).send(putBlog).expect(401)

    await api
      .put(`/api/blogs/${variables.blogId}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + variables.token + 'worng')
      .expect(401)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })

  test('fails with status code 403 if other user authorization', async () => {
    const username = 'oti'
    const password = 'salainen2'

    const newUser = new User({
      'name': 'Ole',
      username,
      password,
    })

    await newUser.save()

    const response = await api.post('/api/login').send({ username, password })
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${variables.blogId}`)
      .send(putBlog)
      .set('Authorization', 'Bearer ' + response.body.token)
      .expect(403)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
