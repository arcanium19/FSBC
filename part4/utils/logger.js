const app = require('../app')

const info = (port) => {
    return app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}