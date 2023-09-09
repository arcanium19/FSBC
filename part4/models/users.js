const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')

console.log('connecting to', config.URI_DB)


try {
    mongoose.connect(config.URI_DB)
    console.log('Connected to mongoDB USERS')
} catch (error) {
    console.log('Error connecting to MongoDB: ', error.message)
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minlength: 3, require: true },
    name: { type: String, require: true },
    password: { type: String, minlength: 3, require: true },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    token: { type: String, minlength: 15, unique: true }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)