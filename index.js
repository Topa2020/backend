const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)