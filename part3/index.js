const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
morgan.token('showData', function (req, res) { return JSON.stringify(req.body)})
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
app.use(bodyParser.json()); // Configura body-parser para analizar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Configura body-parser para analizar datos de formularios

let numbers = {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }
  
//   let numbers = {
//     "persons": [
//       {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//       },
//       {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//       },
//       {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//       }
//     ]
//   }


//GET ALL
app.get('/api/persons', async (req, res)=>{
    try {
        res.status(200).json(numbers.persons)
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
})

//GET BY ID
app.get('/api/persons/:id', async(req, res)=>{
    try {
        const { id } = req.params
        const personNumber = numbers.persons[id-1]
        if(personNumber) res.status(200).send(personNumber);
        else{
            res.status(404).json({Error404: 'Item not found'})
        }
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
})

//GET INFO
app.get('/info', async (req, res)=>{
    try {
        let count = 0;
        for(let i=0; i<numbers.persons.length; i++){
            count += 1
        }
        const actualDate = new Date()
        res.status(200).send(`<div><p>Phonebook has info for ${count} people<br />${actualDate}</p></div>`)

    } catch (error) {
        res.status(400).json({Error: error.message})
    }
})

//POST NEWONE
app.post('/api/persons', async(req, res)=>{
    try {
        //generate a random id
        const {name, number} = req.body
        if(!name || !number){
            if(!name) throw new Error('Please enter a name.')
            if(!number) throw new Error('Please enter a number.')
        }else{
            const exist = numbers.persons.find(e=>e.name === name)
            if(exist) throw new Error('Name must be unique.')
            else{
                const idRandom = Math.floor(Math.random() * 10000)
                numbers.persons.push({name: name, number: number, id: idRandom})
                console.log(numbers.persons)
                res.status(200).send(`${name} has been added successfully`)
            }
        }
        
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
})


//DELETE BY ID
app.delete('/api/persons/:id', async(req, res)=>{
    try {
        const { id } = req.params
        const person = numbers.persons.find(e=>e.id == id)
        if(person){
            const newArr = numbers.persons.filter(e=>e.id != id)
            numbers.persons = newArr;
            console.log(numbers.persons)
            res.status(200).send(`${person} has been deleted successfully from the server`)
        }else{
            res.status(404).send(`id: ${id} not found`)
        }
        
    } catch (error) {
        res.status(400).json({Error: error.message})
    }
})

app.listen(PORT, ()=>{console.log(`Server running on port: ${PORT}`)})