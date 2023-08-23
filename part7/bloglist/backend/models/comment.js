const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, ' is missing'],
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})

module.exports = mongoose.model('Comment', commentSchema)
