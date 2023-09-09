const User = require('../models/users')
const userRoutes = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

userRoutes.get('/', async (request, response) => {
    try {
        const result = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
        response.status(200).send(result)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

userRoutes.post('/login', async (request, response) => {
    const { username, password } = request.body
    try {
        if(!username || !password) response.status(400).json({ error: 'username or password are missing' })
        const userFinded = await User.findOne({ username })
        if(!userFinded) response.status(401).json({ error: 'Invalid username' })
        const correctPassword = await bcrypt.compare(password, userFinded.password)
        if(correctPassword){
            const userForToken = {
                username,
                id: userFinded._id
            }

            const token = jwt.sign(userForToken, SECRET, { expiresIn: '6h' })
            userFinded.token = token
            await userFinded.save()
            response.status(200).json({ username: userFinded.username, name: userFinded.name, token })
        }else{
            response.status(401).json({ error: 'Invalid password' })
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

userRoutes.post('/register', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !name || !password) {
        return response.status(400).json({ error: 'Some login info are missing' })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: 'Username and password must be at least 3 characters long' })
    }

    try {
        const userExist = await User.findOne({ username: username })

        if (userExist) {
            return response.status(400).json({ error: 'Username is already in use' })
        }

        const passowrdHashed = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            name,
            password: passowrdHashed
        })

        console.log('this is the new user: ', newUser)

        newUser.save()
        return response.status(201).send({ message: `User '${newUser.username}' successfully created` })
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})


module.exports = userRoutes