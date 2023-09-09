const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRoutes = require('./controllers/blogs')
const userRoutes = require('./controllers/users')
const middleware = require('./utils/middleware')


//middlewares:
app.use(cors())
app.use(express.static('build'))
morgan.token('showData', function (req) { return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms', '-',
        tokens.showData(req, res)
    ].join(' ')
}))
// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use(bodyParser.json()) // Configura body-parser para analizar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })) // Configura body-parser para analizar datos de formularios

//Routes:
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)
app.use(middleware.unknownEndpoint)


module.exports = app

