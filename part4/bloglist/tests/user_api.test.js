const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/user_api_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initUsers.map((user) => new User(user))
  const promiseArray = userObjects.map((user) => user.save())
  await Promise.all(promiseArray)
})

describe('get users after dummy users saved', () => {
  test('successful with status code 200 as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returned the same length of saved users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initUsers.length)
  })

  test('there not are defined "password" property', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].password).not.toBeDefined()
  })

  test('there not are defined "passwordHash" property', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].passwordHash).not.toBeDefined()
  })
})

describe('post a single user after dummy users saved', () => {
  test('successful with status code 201 as json', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': 'secret',
    }

    await api
      .post('/api/users')
      .send(postUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('successful the same user is returned without password and passwordHash but with id', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': 'secret',
    }

    const response = await api.post('/api/users').send(postUser)

    expect(response.body.username).toEqual(postUser.username)
    expect(response.body.name).toEqual(postUser.name)
    expect(response.body.password).not.toBeDefined()
    expect(response.body.passwordHash).not.toBeDefined()
    expect(response.body.id).toBeDefined()
  })

  test('successful the posted user saved in DB', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': 'secret',
    }

    const response = await api.post('/api/users').send(postUser)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length + 1)

    const ids = usersInDb.map((user) => user.id)
    expect(ids).toContain(response.body.id)
  })

  test('fails with status code 400 if user without password', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
    }

    await api.post('/api/users').send(postUser).expect(400)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length)
  })

  test('fails with status code 400 if user password is incorrect - less the 3', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': 'se',
    }

    await api.post('/api/users').send(postUser).expect(400)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length)
  })

  test('fails with status code 400 if user password is incorrect - not starts from a char', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': '!secret',
    }

    await api.post('/api/users').send(postUser).expect(400)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length)
  })

  test('fails with status code 400 if user without username', async () => {
    const postUser = {
      'name': 'Ole',
      'password': 'secret',
    }

    await api.post('/api/users').send(postUser).expect(400)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length)
  })

  test('fails with status code 400 if user username is incorrect - less the 3', async () => {
    const postUser = {
      'username': 'ot',
      'name': 'Ole',
      'password': 'secret',
    }

    await api.post('/api/users').send(postUser).expect(400)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initUsers.length)
  })

  test('fails with status code 400 if user username is not unique', async () => {
    const postUser = {
      'username': 'oti',
      'name': 'Ole',
      'password': 'secret',
    }

    await api.post('/api/users').send(postUser)

    const usersInDb = await helper.usersInDb()

    await api.post('/api/users').send(postUser).expect(400)

    expect(usersInDb).toHaveLength(helper.initUsers.length + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
