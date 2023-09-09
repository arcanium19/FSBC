const User = require('../models/users')
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const authorizationHeader = req.get('authorization')

    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
        req.token = authorizationHeader.substring(7) // Extraer el token (7 caracteres después de 'Bearer ')
    }

    next() // Llamar a next() para que la solicitud continúe
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7) // Quita 'Bearer ' del encabezado

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET) // Verifica el token
            if (!decodedToken.id) {
                return response.status(401).json({ error: 'Token missing or invalid' })
            }

            // Encuentra al usuario basado en el ID del token y establécelo en request.user
            const user = await User.findById(decodedToken.id)
            request.user = user

            // Continúa con la siguiente middleware o enrutador
            next()
        } catch (error) {
            return response.status(401).json({ error: 'Token missing or invalid' })
        }
    } else {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = {
    tokenExtractor,
    userExtractor,
    unknownEndpoint
}

// const getAuthToken = (request) => {
//     const authorization = request.get('authorization')
//     if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//         return authorization.substring(7)
//     }else{
//         return null
//     }
// }

// module.exports = getAuthToken