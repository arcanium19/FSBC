const Blog = require('../models/blog')
// const User = require('../models/users')
const blogRoutes = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const middleware = require('../utils/middleware')

blogRoutes.get('/', async (request, response) => {
    try {
        const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.status(200).send(result)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

blogRoutes.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    try {
        const { title, author, url, likes } = request.body
        if(!title || !author || !url){
            response.status(400).send({ error: 'There are missing input data' })
        }else {
            const token = request.token
            const decodedToken = await jwt.verify(token, SECRET)
            if(!token || !decodedToken){
                return response.status(401).json({ error: 'Token missing or invalid' })
            }
            const findUser = request.user
            if(!findUser){
                response.status(400).json({ error: 'User not found' })
            }else{
                if(findUser.token !== token){
                    return response.status(401).json({ error: 'sesion finished, log in and try again' })
                }else{
                    if(!likes){
                        const blog = new Blog({
                            title,
                            author,
                            url,
                            likes: 0,
                            user: findUser._id
                        })

                        const blogCreated = await blog.save()
                        findUser.blogs = findUser.blogs.concat(blogCreated._id)
                        await findUser.save()
                    }else{
                        const blog = new Blog({
                            title,
                            author,
                            url,
                            likes,
                            user: findUser._id
                        })
                        const blogCreated = await blog.save()
                        findUser.blogs = findUser.blogs.concat(blogCreated._id)
                        await findUser.save()
                    }

                    try {
                        // Intentar guardar el blog en la base de datos
                        response.status(201).json('Has been created.')
                    } catch (error) {
                        // Manejar el error de validación por campo duplicado
                        if (error.name === 'MongoError' && error.code === 11000) {
                            response.status(400).json({ error: 'URL or title already exists' })
                        } else {
                            response.status(400).json({ error: error.message })
                        }
                    }
                }
            }
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

blogRoutes.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const { id } = request.params
    const token = request.token
    try {
        if(!id) response.status(404).send({ error: 'Blog ID missing' })
        else if(!token) response.status(404).json({ error: 'Token missing' })
        else{
            const decoded = await jwt.verify(token, SECRET)
            const user = request.user
            const eliminateBlog = await Blog.findByIdAndDelete(id)
            if(eliminateBlog){
                if(eliminateBlog.user.toString() !== decoded.id.toString() || user?.token !== token){
                    return response.status(401).json({ error: 'You do not have enought authorization' })
                }else{
                    return response.status(200).send(`Title: ${eliminateBlog.title} has been successfully deleted`)
                }
            }else{
                response.status(404).send({ error: 'could not find the blog' })
            }
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

blogRoutes.put('/:id', async (request, response) => {
    const { id } = request.params
    const { likes } = request.body
    try {
        if(!id) response.status(404).send({ error: 'ID is missing, please try again' })
        else{
            const updateBlog = await Blog.findByIdAndUpdate(id, { likes }, { runValidators: true, context: 'query' })
            if(updateBlog){
                response.status(200).send(`Title: ${updateBlog.title} has been successfully updated (Likes: ${updateBlog.likes} -> ${likes})`)
            }else{
                response.status(404).send({ error: 'could not find the blog' })
            }
        }
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
})

module.exports = blogRoutes