const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))


let persons = [
      { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
      },
      { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
      },
      { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
      },
      { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
      }
    ]
  

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
      
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const date = new Date()
app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + persons.length + ' people <br>' + date + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.send('<p>' + person.name +'  '+ person.number + '</p>')
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    persons = persons.filter(person => person.id !== id)
    if (person) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }

  })

  const generateId = () => {
    const randomId = Math.floor(Math.random() * 10000)
    return randomId
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
   
    const personas = persons.map(p => p.name.includes(body.name))
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (personas.includes(true)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })

    }
    else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),

    }

    persons = persons.concat(person)
    response.json(person)


  }})

  

  


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })