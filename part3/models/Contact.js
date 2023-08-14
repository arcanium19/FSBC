const mongoose = require('mongoose')
const uniquieValidator = require('mongoose-unique-validator')

const url = process.env.URI_DB


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {type: String, require: true, unique: true, minlength: 3},
  number: {type: String, require: true, unique: true, minlength: 8}
})

contactSchema.plugin(uniquieValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Contact', contactSchema)