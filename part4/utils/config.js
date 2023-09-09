const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3001

let URI_DB = process.env.URI_DB
if (process.env.NODE_ENV === 'test') {
    URI_DB = process.env.TEST_MONGODB_URI
}

const SECRET = process.env.SECRET


module.exports = {
    URI_DB,
    PORT,
    SECRET
}