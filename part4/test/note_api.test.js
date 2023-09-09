const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

describe('Blogs TESTING /api/blogs', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the property "id" exists instead of "_id"', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('if POST is working', async () => {

        const loginData = {
            username: 'jonaRoot',
            password: '123456'
        }

        const user = await api
            .post('/api/users/login')
            .send(loginData)
            .expect(200)

        const numberRandom = Math.floor(Math.random() * 1000)


        const newBlogTest ={
            title: `Blog Test ${numberRandom}`,
            author: 'adminTEST',
            url: `https://laurl.com/new/test/${numberRandom}`,
            likes: numberRandom
        }

        const beforeCount = await api
            .get('/api/blogs')
            .expect(200)

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${user.body.token}`)
            .send(newBlogTest)
            .expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(beforeCount.body.length + 1)
    })

    test('if Likes exists', async () => {
        const loginData = {
            username: 'jonaRoot',
            password: '123456'
        }

        const user = await api
            .post('/api/users/login')
            .send(loginData)
            .expect(200)

        const numberRandom = Math.floor(Math.random() * 1000)

        const likesTest = {
            title: `Blog Test Likes ${numberRandom}`,
            author: 'adminTEST',
            url: `https://laurl.com/new/test/likes/${numberRandom}`,
        }

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${user.body.token}`)
            .send(likesTest)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await Blog.findOne({ title: likesTest.title })
        console.log(result)
        expect(result.likes).toBe(0)
    })

    test('if "title" or "url" are missing return 400 Bad Request', async () => {

        const loginData = {
            username: 'jonaRoot',
            password: '123456'
        }

        const user = await api
            .post('/api/users/login')
            .send(loginData)
            .expect(200)


        const bodyDataMissing = {
            author: 'Janeth',
            likes: 188,
        }

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${user.body.token}`)
            .send(bodyDataMissing)
            .expect(400)
    })

    test('If there is not a Token send 401 Unauthorized', async () => {

        const numberRandom = Math.floor(Math.random() * 1000)


        const newBlogTest ={
            title: `Blog Test ${numberRandom}`,
            author: 'adminTEST',
            url: `https://laurl.com/new/test/${numberRandom}`,
            likes: numberRandom
        }


        await api
            .post('/api/blogs')
            .send(newBlogTest)
            .expect(401)

    })
})


describe('Users TESTING /api/users', () => {
    test('invalid users are not allowed (SHORT PASSWORD)', async () => {
        const numberRandom = Math.floor(Math.random() * 1000)
        const newUserData = {
            username: `testignUser${numberRandom}`,
            name: 'Estela',
            password: '12'
        }

        const response = await api
            .post('/api/users/register')
            .send(newUserData)
            .expect(400)

        expect(response.body.error).toBe('Username and password must be at least 3 characters long')
    })

    test('invalid users are not allowed (SHORT USERNAME)', async () => {
        const newUserData = {
            username: 'UT',
            name: 'User testing',
            password: '123456'
        }

        const response = await api
            .post('/api/users/register')
            .send(newUserData)
            .expect(400)

        expect(response.body.error).toBe('Username and password must be at least 3 characters long')
    })

    test('username empty', async () => {
        const newUserData = {
            name: 'User testing',
            password: '123456'
        }

        const response = await api
            .post('/api/users/register')
            .send(newUserData)
            .expect(400)

        expect(response.body.error).toBe('Some login info are missing')
    })
})


afterAll(() => {
    mongoose.connection.close()
})