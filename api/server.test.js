// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(true)
})

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('responds with username and password when info entered correctly', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'jimmy',
      password: 'abcd',
    })
    expect(res.body).toMatchObject({username: 'jimmy'})
  })
  test('responds with error when missing username', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'jim',
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
})

describe('[POST] /login', () => {
  test('responds with error when no username', async () => {
    const res = await request(server).post('/login').send({
      username: '',
      password: 'abcd'
    })
    expect(res.status).toBe(404)
  })
  test('responds with error when no password', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'jimmy',
      password: ''
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })

})