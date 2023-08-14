const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const Contact = require('./models/Contact')

app.use(express.static('build'))
app.use(cors())
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
app.use(bodyParser.json()) // Configura body-parser para analizar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })) // Configura body-parser para analizar datos de formularios


const numbers = {
    'persons': [
        {
            'name': 'Arto Hellas',
            'number': '040-123456',
            'id': 1
        },
        {
            'name': 'Ada Lovelace',
            'number': '39-44-5323523',
            'id': 2
        },
        {
            'name': 'Dan Abramov',
            'number': '12-43-234345',
            'id': 3
        },
        {
            'name': 'Mary Poppendieck',
            'number': '39-23-6423122',
            'id': 4
        }
    ]
}


//GET ALL
app.get('/api/persons', async (req, res, next) => {
    try {
        const contacts = await Contact.find({})
        if(contacts.length === 0){
            numbers.persons.forEach(async c => {
                const newContact = new Contact({
                    name: c.name,
                    number: c.number
                })
                console.log(newContact)
                await newContact.save()
            })
            const contactList = await Contact.find({})
            res.status(200).json(contactList)
        }else{
            res.status(200).json(contacts)
        }
    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})

//GET BY ID
app.get('/api/persons/:id', async(req, res, next) => {
    try {
        const { id } = req.params
        const contactData = await Contact.findById(id)
        res.status(200).json(contactData)
        // const personNumber = numbers.persons[id-1]
        // if(personNumber) res.status(200).send(personNumber);
        // else{
        //     res.status(404).json({Error404: 'Item not found'})
        // }
    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})

//GET INFO
app.get('/info', async (req, res, next) => {
    try {
        const allContacts = await Contact.find({})
        let count = 0
        for(let i=0; i<allContacts.length; i++){
            count += 1
        }
        const actualDate = new Date()
        res.status(200).send(`<div><p>Phonebook has info for ${count} people<br />${actualDate}</p></div>`)

    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})

//POST NEWONE
app.post('/api/persons', async(req, res, next) => {
    try {
        //generate a random id
        const { name, number } = req.body
        if(!name || !number){
            if(!name) res.status(400).send('Please enter a name.')
            if(!number) res.status(400).send('Please enter a number.')
        }else{
            const exist = await Contact.findOne({ name: name })
            if(exist) res.status(400).send('Name must be unique.')
            else{
                const newContact = new Contact({
                    name, number
                })
                await newContact.save()
                res.status(200).send(`${newContact.name} has been added successfully`)
            }
        }
    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})


//DELETE BY ID
app.delete('/api/persons/:id', async(req, res, next) => {
    try {
        const { id } = req.params
        // const person = numbers.persons.find(e=>e.id == id)
        const contactDeleted = await Contact.findByIdAndDelete(id)
        res.status(200).send(`${contactDeleted.name} has been deleted successfully from the server`)
    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})

//UPDATE BY ID
app.put('/api/persons/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, number } = req.body
        const contactUpdated = await Contact.findByIdAndUpdate(id, { number }, { runValidators: true, context: 'query' })
        if(!contactUpdated){
            res.status(400).json({ error: `Information of ${name } has already been removed from the server` })
        }
        else{
            console.log(`${contactUpdated.name} has been updated successfully`)
            res.status(200).send('Updated successfully')
        }
    } catch (error) {
        next(error)
        // res.status(400).json({Error: error.message})
    }
})

const uknownPath = (req, res) => {
    res.status(404).json({ Error: '404 - url not found' })
}

app.use(uknownPath)

const errorMiddlewares = async (error, req, res, next) => {
    if(error.name === 'CastError'){
        res.status(400).json({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){
        res.status(400).json({ error: error.message })
    }else if(error.name === 'dataDeleted'){
        res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorMiddlewares)

app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})