const notesRouter = require('express').Router()
const Note = require('../models/note')

/*
notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})
*/

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

/*
notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
*/

/* 2
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})
*/

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

/*
notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      //response.json(savedNote)
      response.status(201).json(savedNote)
    })
    .catch((error) => next(error))
})
*/

/* 2
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  //const savedNote = await note.save()
  //response.status(201).json(savedNote)
  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})
*/

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

/* 1
notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})
*/

/* 2
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
*/

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  const note = {
    content,
    important,
  }

  const options = {
    new: true,
    runValidators: true,
    context: 'query',
  }

  Note.findByIdAndUpdate(request.params.id, note, options)
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

module.exports = notesRouter
