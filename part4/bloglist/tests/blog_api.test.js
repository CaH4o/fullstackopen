const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const init = require('../utils/dummy_blogs')
const helper = require('../utils/blog_api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(init.listWithManyBlog)
})

describe('get blogs after dummy_blogs saved', () => {
  test('successful with status code 200 as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned the same length of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(init.listWithManyBlog.length)
  })

  test('there are defined "id" property', async () => {
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb[0].id).toBeDefined()
  })
})

describe('post a single blog after dummy_blogs saved', () => {
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
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('successful the same blog is returned', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api.post('/api/blogs').send(postBlog)

    expect(response.body.author).toEqual(postBlog.author)
    expect(response.body.title).toEqual(postBlog.title)
    expect(response.body.url).toEqual(postBlog.url)
    expect(response.body.likes).toEqual(postBlog.likes)
  })

  test('successful the post blog is saved in DB', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api.post('/api/blogs').send(postBlog)

    const blogsInDbAfterPost = await helper.blogsInDb()
    expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length + 1)

    const ids = blogsInDbAfterPost.map((b) => b.id)
    expect(ids).toContain(response.body.id)
  })

  test('successful with status code 201 as json if without likes', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
    }

    await api
      .post('/api/blogs')
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('the value of likes is as default if without likes', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
    }

    const response = await api.post('/api/blogs').send(postBlog)
    expect(response.body.likes).toBe(0)
  })

  test('fails with status code 400 if without title', async () => {
    const postBlog = {
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.post('/api/blogs').send(postBlog).expect(400)

    const blogsInDbAfterPost = await helper.blogsInDb()
    expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length)
  })

  test('fails with status code 400 if without url', async () => {
    const postBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      likes: 5,
    }

    await api.post('/api/blogs').send(postBlog).expect(400)

    const blogsInDbAfterPost = await helper.blogsInDb()
    expect(blogsInDbAfterPost).toHaveLength(init.listWithManyBlog.length)
  })
})

describe('delete a blog after dummy_blogs saved', () => {
  test('successful with status code 204 if id is valid', async () => {
    const blogsInDb = await helper.blogsInDb()
    const idBlogToDelete = blogsInDb[0].id

    await api.delete(`/api/blogs/${idBlogToDelete}`).expect(204)
  })

  test('successful delete in DB', async () => {
    const blogsInDbBeforeDelete = await helper.blogsInDb()
    const idBlogToDelete = blogsInDbBeforeDelete[0].id

    await api.delete(`/api/blogs/${idBlogToDelete}`)

    const blogsInDbAfterDelete = await helper.blogsInDb()
    expect(blogsInDbAfterDelete).toHaveLength(blogsInDbBeforeDelete.length - 1)

    const ids = blogsInDbAfterDelete.map((b) => b.id)
    expect(ids).not.toContain(idBlogToDelete)
  })

  test('fails with status code 404 if id is incorrect', async () => {
    const idBlogToDelete = '000000000000000000000000'

    await api.delete(`/api/blogs/${idBlogToDelete}`).expect(404)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(init.listWithManyBlog.length)
  })

  test('fails with status code 400 if id is invalid', async () => {
    let idBlogToDelete
    await api.delete(`/api/blogs/${idBlogToDelete}`).expect(400)

    idBlogToDelete = '0000'
    await api.delete(`/api/blogs/${idBlogToDelete}`).expect(400)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(init.listWithManyBlog.length)
  })
})

describe('put a blog after dummy_blogs saved', () => {
  test('successful with status code 200 as json', async () => {
    const blogsInDb = await helper.blogsInDb()
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api
      .put(`/api/blogs/${blogsInDb[0].id}`)
      .send(putBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('successful the same blog is returned', async () => {
    const blogsInDb = await helper.blogsInDb()
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    const response = await api
      .put(`/api/blogs/${blogsInDb[0].id}`)
      .send(putBlog)

    expect(response.body.author).toEqual(putBlog.author)
    expect(response.body.title).toEqual(putBlog.title)
    expect(response.body.url).toEqual(putBlog.url)
    expect(response.body.likes).toEqual(putBlog.likes)
  })

  test('successful the put blog still in the DB', async () => {
    const blogsInDb = await helper.blogsInDb()
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.put(`/api/blogs/${blogsInDb[0].id}`).send(putBlog)

    const blogsInDbAfterPut = await helper.blogsInDb()
    expect(blogsInDbAfterPut).toHaveLength(init.listWithManyBlog.length)

    const ids = blogsInDbAfterPut.map((b) => b.id)
    expect(ids).toContain(blogsInDb[0].id)
  })

  test('fails with status code 404 if id is incorrect', async () => {
    const putBlog = {
      id: '000000000000000000000000',
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.put(`/api/blogs/${putBlog.id}`).send(putBlog).expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const putBlog = {
      title: 'Blog',
      author: 'Member of Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Blog',
      likes: 5,
    }

    await api.put(`/api/blogs/${putBlog.id}`).send(putBlog).expect(400)

    await api.put(`/api/blogs/${'fake id'}`).send(putBlog).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
