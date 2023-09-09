const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')

console.log('connecting to', config.URI_DB)


try {
    mongoose.connect(config.URI_DB)
    console.log('Connected to MongoDB BLOGS')
} catch (error) {
    console.log('Error connecting to MongoDB:', error.message)
}

// mongoose.connect(config.URI_DB)
//     .then(() => {
//         console.log('Connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('Error connecting to MongoDB:', error.message)
//     })

const blogSchema = new mongoose.Schema({
    title: { type: String, unique: true, require: true },
    author: { type: String, require: true },
    url: { type: String, unique: true, require: true },
    likes: { type: Number, require: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Blog', blogSchema)